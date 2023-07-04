package com.seb_main_006.global.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.global.auth.attribute.MemberInfoResponseDto;
import com.seb_main_006.global.auth.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) throws JsonProcessingException {
        System.out.println("AuthController.logout");

        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshToken = request.getHeader("RefreshToken");

        // TODO: ADMIN 계정일 경우 로그아웃 시키지 않기?

        authService.logout(accessToken, refreshToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request,
                                  HttpServletResponse response,
                                  @AuthenticationPrincipal(expression = "username") String userEmail) throws JsonProcessingException {
        log.info("userEmail = {}", userEmail);

        String refreshToken = request.getHeader("RefreshToken");
        String newAccessToken = authService.reissue(refreshToken, userEmail);

        // 응답 헤더에 재발급된 AccessToken 추가
        response.setHeader("Authorization", "Bearer " + newAccessToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members")
    public ResponseEntity getMemberInfoForFront(HttpServletRequest request) throws JsonProcessingException {
        String authorization = request.getHeader("Authorization");

        if (authorization == null) {
            return new ResponseEntity<>(new MemberInfoResponseDto(), HttpStatus.OK);
        }

        String accessToken = authorization.replaceAll("Bearer ", "");
        MemberInfoResponseDto memberInfo = authService.getMemberInfo(accessToken);

        return new ResponseEntity<>(memberInfo, HttpStatus.OK);
    }
}
