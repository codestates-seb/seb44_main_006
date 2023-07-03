package com.seb_main_006.global.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity logout(HttpServletRequest request) throws JsonProcessingException {
        System.out.println("AuthController.logout");

        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        authService.logout(accessToken);

        return null;
    }

    @GetMapping("/test")
    public void test(@AuthenticationPrincipal(expression = "username") String email) {
        System.out.println("AuthController.test");
        System.out.println("email = " + email); // OK
    }
}
