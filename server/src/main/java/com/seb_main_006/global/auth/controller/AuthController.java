package com.seb_main_006.global.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.attribute.MemberInfoResponseDto;
import com.seb_main_006.global.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 로그아웃
     */
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) throws JsonProcessingException {

        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshToken = request.getHeader("RefreshToken");

        authService.logout(accessToken, refreshToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 리이슈(토큰만료시 재요청)
     */
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

    /**
     * 멤버정보조회(FE에서 사용용도)
     */
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
