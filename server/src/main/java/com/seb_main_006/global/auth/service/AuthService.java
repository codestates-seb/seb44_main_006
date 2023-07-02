package com.seb_main_006.global.auth.service;

import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final RedisUtil redisUtil;

    public AuthService(RefreshTokenRedisRepository refreshTokenRedisRepository, RedisUtil redisUtil) {
        this.refreshTokenRedisRepository = refreshTokenRedisRepository;
        this.redisUtil = redisUtil;
    }

    public String logout(String accessToken, String username) {

        // refreshToken 테이블의 refreshToken 삭제
        RefreshToken refreshToken = refreshTokenRedisRepository.findByUsername(username);
        refreshTokenRedisRepository.delete(refreshToken);
        // 레디스에 accessToken 사용못하도록 등록
        redisUtil.setBlackList(accessToken, "accessToken", 5);

        return "로그아웃 완료";
    }
}
