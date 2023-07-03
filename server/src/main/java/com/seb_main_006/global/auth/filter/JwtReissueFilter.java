package com.seb_main_006.global.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_006.global.auth.jwt.CustomJwtErrorResponse;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Filter 가 아니라 그냥 Controller, Service 에서 처리하도록 하는 것이 관리하기도, 예외처리하기도 편할 것 같다는 생각...

@Slf4j
@RequiredArgsConstructor
public class JwtReissueFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Subject subject = null;
        try {
            subject = jwtTokenizer.getSubject(token);
        } catch (ExpiredJwtException e) {
            setErrorMessageAndStatus(response, "토큰이 만료되었습니다. 다시 로그인해주세요.");
            return;
        }

        String requestURI = request.getRequestURI();
        log.info("requestURI = {}", requestURI);

        if (requestURI.equals("/auth/reissue") && !subject.getTokenType().equals("RefreshToken")) {
            // 요청 URL:  "/auth/reissue", BUT 토큰 타입이 "RefreshToken" 이 아님 -> 에러 메세지 + 401 status 리턴
            setErrorMessageAndStatus(response, "토큰을 확인해주세요");
            return;

        } else if (requestURI.equals("/auth/reissue") && subject.getTokenType().equals("RefreshToken")) {
            // 요청 URL 이 "/auth/reissue" 이고, 토큰 타입이 "RefreshToken" 인 경우 -> AccessToken 재발급

            // AccessToken 재발급
            String username = subject.getUsername(); // 유저 email
            List<String> authorities = refreshTokenRedisRepository.findByRefreshToken(token).getAuthorities();

            Map<String, Object> claims = new HashMap<>();
            claims.put("username", username);
            claims.put("roles", authorities);

            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            String newAccessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

            // 응답 헤더에 재발급된 AccessToken 추가
            response.setHeader("Authorization", "Bearer " + newAccessToken);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void setErrorMessageAndStatus(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        CustomJwtErrorResponse errorResponse = new CustomJwtErrorResponse(HttpStatus.UNAUTHORIZED.value(), message);
        String result = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(result);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !request.getRequestURI().equals("/auth/reissue");
    }

}
