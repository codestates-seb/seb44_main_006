package com.seb_main_006.global.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.domain.bookmark.service.BookmarkService;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.auth.attribute.MemberInfoResponseDto;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public MemberInfoResponseDto getMemberInfo(String accessToken) throws JsonProcessingException {
        String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
        Member findMember = memberService.findVerifiedMember(memberEmail);
        int myBookmarkCount = bookmarkService.getBookmarkCount(findMember);

        return MemberInfoResponseDto.of(findMember, myBookmarkCount);
    }
}
