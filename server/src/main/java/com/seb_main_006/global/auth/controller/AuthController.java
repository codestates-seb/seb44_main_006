package com.seb_main_006.global.auth.controller;

import com.seb_main_006.global.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal(expression = "username") String username, HttpServletRequest request, Authentication authentication) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        authService.logout(accessToken, username);

        System.out.println(username);

        return null;
    }


}
