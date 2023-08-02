package com.seb_main_006.global.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.domain.bookmark.service.BookmarkService;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.auth.dto.MemberInfoResponseDto;
import com.seb_main_006.global.auth.dto.TokenDto;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class AuthService {
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final RedisUtil redisUtil;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final BookmarkService bookmarkService;

    @Value("jwt.key")
    String secretKey;

    public AuthService(RefreshTokenRedisRepository refreshTokenRedisRepository, RedisUtil redisUtil, JwtTokenizer jwtTokenizer, MemberService memberService, BookmarkService bookmarkService) {
        this.refreshTokenRedisRepository = refreshTokenRedisRepository;
        this.redisUtil = redisUtil;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.bookmarkService = bookmarkService;
    }

    public void logout(String accessToken, String refreshToken) {
        log.info("accessToken = {}, refreshToken = {}", accessToken, refreshToken);

        // refreshToken 테이블의 refreshToken 삭제
        RefreshToken findRefreshToken = refreshTokenRedisRepository.findByRefreshToken(refreshToken);
        refreshTokenRedisRepository.delete(findRefreshToken);

        // 레디스에 accessToken 사용못하도록 등록
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Claims claims = jwtTokenizer.getClaims(accessToken, base64EncodedSecretKey).getBody();

        // AccessToken 의 남은 만료시간 계산하여 블랙리스트 토큰의 만료시간으로 지정
        long expirationTime = claims.getExpiration().getTime();
        long currentTime = Instant.now().toEpochMilli();
        long remainingTime = expirationTime - currentTime;
        System.out.println("currentTime = " + currentTime + ", remainingTime = " + remainingTime);

        redisUtil.setBlackList(accessToken, "accessToken", remainingTime);
    }

    /**
     * AccessToken 재발급
     */
    public String reissue(String refreshToken, String userEmail) throws JsonProcessingException {
        log.info("refreshToken = {}", refreshToken);

        String tokenType = jwtTokenizer.getSubject(refreshToken).getTokenType();

        if (!tokenType.equals("RefreshToken")) { // "RefreshToken" 이 아님 -> 에러 메세지 + 418 status 리턴
            throw new BusinessLogicException(ExceptionCode.IM_A_TEAPOT);
        }

        // "RefreshToken" 인 경우 -> AccessToken 재발급 후 리턴
        List<String> authorities = refreshTokenRedisRepository.findByRefreshToken(refreshToken).getAuthorities();

        return jwtTokenizer.generateAccessToken(userEmail, authorities);
    }

    /**
     * AccessToken 재발급 + 리프레시 토큰 만료시간 확인 및 재발급
     */
    public TokenDto reissueV2(String refreshToken, String userEmail) throws JsonProcessingException {
        log.info("refreshToken = {}", refreshToken);

        // Redis에서 전달받은 refreshToken으로 조회한 결과가 없다면 예외 발생
        RefreshToken findRefreshToken = refreshTokenRedisRepository.findByRefreshToken(refreshToken);
        if (findRefreshToken == null) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED);
        }

        String newRefreshToken = refreshToken; // 재발급이 필요하지 않으면 기존 RTK 가 전달되도록 초기값 설정

        // RTK 남은 만료시간 계산
        long expirationTime = jwtTokenizer.getClaims(refreshToken).getBody().getExpiration().getTime();  // RTK의 만료 시점
        long currentTime = Instant.now().toEpochMilli();  // 현재 시점 // System.currentTimeMillis();
        log.info("expirationTime = {}, currentTime = {}", expirationTime, currentTime);

        // 리프레시 만료시간 24시간 이하 남은 상태
        if (expirationTime - currentTime <= 90_000_000) { // 25시간 90000000
            newRefreshToken = jwtTokenizer.generateRefreshToken(userEmail); // 재발급된 RTK newRefreshToken에 할당
        }

        // 예외 핸들링 (토큰 타입 검사)
        String tokenType = jwtTokenizer.getSubject(refreshToken).getTokenType();
        if (!tokenType.equals("RefreshToken")) {
            throw new BusinessLogicException(ExceptionCode.IM_A_TEAPOT);
        }

        // AccessToken 재발급 후 ATK, RTK TokenDto로 리턴
        List<String> authorities = findRefreshToken.getAuthorities();
        String newAccessToken = jwtTokenizer.generateAccessToken(userEmail, authorities);

        // 기존 RefreshToken 삭제 & newRefreshToken Redis에 새로 저장
        refreshTokenRedisRepository.delete(findRefreshToken);
        refreshTokenRedisRepository.save(RefreshToken.builder()
                .id(userEmail)
                .username(userEmail)
                .authorities(authorities)
                .refreshToken(newAccessToken)
                .build());

        return new TokenDto(newAccessToken, newRefreshToken);
    }

    /**
     * 프론트 저장용 유저 정보 조회
     */
    @Transactional(readOnly = true)
    public MemberInfoResponseDto getMemberInfo(String accessToken) {

        Member member = new Member(0L);
        boolean isAdmin = false;

        if (accessToken != null && !accessToken.equals("")) {
            try {
                String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
                member = memberService.findVerifiedMember(memberEmail);
            }catch (ExpiredJwtException ee){
                throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED);
            }
            catch (Exception e) {
                log.info("Any Error");
            }
        }

        if(member.getRoles().size() != 0){
            List<String> roleList = member.getRoles();
            isAdmin = roleList.contains("ADMIN");
        }

        int myCourseCount = member.getCourses().size();
        int myBookmarkCount = bookmarkService.getBookmarkCount(member);
        return MemberInfoResponseDto.of(member, myCourseCount, myBookmarkCount, isAdmin);
    }
}
