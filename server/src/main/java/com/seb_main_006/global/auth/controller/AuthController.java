package com.seb_main_006.global.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.service.AuthService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        // 리프레시도 같이 가져와서
        authService.logout(accessToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request,
                                  HttpServletResponse response) throws JsonProcessingException {
        System.out.println("AuthController.reissue");

        String refreshToken = request.getHeader("RefreshToken");
        String newAccessToken = authService.reissue(refreshToken);

        // 응답 헤더에 재발급된 AccessToken 추가
        response.setHeader("Authorization", "Bearer " + newAccessToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/test")
    public void test(@AuthenticationPrincipal(expression = "username") String email) {
        System.out.println("AuthController.test");
        System.out.println("email = " + email); // OK
    }
}
