package com.seb_main_006.global.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AuthService {
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final RedisUtil redisUtil;
    private final JwtTokenizer jwtTokenizer;

    @Value("jwt.key")
    String secretKey;

    public AuthService(RefreshTokenRedisRepository refreshTokenRedisRepository, RedisUtil redisUtil, JwtTokenizer jwtTokenizer) {
        this.refreshTokenRedisRepository = refreshTokenRedisRepository;
        this.redisUtil = redisUtil;
        this.jwtTokenizer = jwtTokenizer;
    }

    public void logout(String accessToken, String refreshToken) throws JsonProcessingException {
        System.out.println("AuthService.logout");

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

    public String reissue(String refreshToken) throws JsonProcessingException {
        System.out.println("AuthService.reissue");

        Subject subject = null;

        if (refreshToken == null) { //RefreshToken 이 비어있을시 에러
            throw new BusinessLogicException(ExceptionCode.IM_A_TEAPOT);
        }
        try { //RefreshToken 이 만료시 에러
            subject = jwtTokenizer.getSubject(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED);
        }
        if (!subject.getTokenType().equals("RefreshToken")) { // "RefreshToken" 이 아님 -> 에러 메세지 + 418 status 리턴
            throw new BusinessLogicException(ExceptionCode.IM_A_TEAPOT);
        }

        // "RefreshToken" 인 경우 -> AccessToken 재발급 후 리턴
        String username = subject.getUsername(); // 유저 email
        List<String> authorities = refreshTokenRedisRepository.findByRefreshToken(refreshToken).getAuthorities();

        return jwtTokenizer.generateAccessToken(username, authorities);
    }
}
