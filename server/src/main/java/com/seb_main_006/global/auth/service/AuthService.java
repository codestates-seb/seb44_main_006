package com.seb_main_006.global.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Map;

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

    public void logout(String accessToken) throws JsonProcessingException {
        Subject subject = jwtTokenizer.getSubject(accessToken);

        System.out.println("AuthService.logout");
        System.out.println("email = " + subject.getUsername());

        // refreshToken 테이블의 refreshToken 삭제
        RefreshToken refreshToken = refreshTokenRedisRepository.findByUsername(subject.getUsername());
        System.out.println("refreshToken = " + refreshToken);

        refreshTokenRedisRepository.delete(refreshToken);

        RefreshToken refreshTokenAfterDelete = refreshTokenRedisRepository.findByUsername(subject.getUsername());
        System.out.println("refreshTokenAfterDelete = " + refreshTokenAfterDelete);

        // 레디스에 accessToken 사용못하도록 등록
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Claims claims = jwtTokenizer.getClaims(accessToken, base64EncodedSecretKey).getBody();

        long expirationTime = claims.getExpiration().getTime();
        long currentTime = Instant.now().toEpochMilli();
        System.out.println("currentTime = " + currentTime);

        long remainingTime = expirationTime - currentTime;
        System.out.println("remainingTime = " + remainingTime);
        redisUtil.setBlackList(accessToken, "accessToken", remainingTime);
    }
}
