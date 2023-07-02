package com.seb_main_006.global.auth.filter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_006.global.auth.handler.OAuth2MemberSuccessHandler;
import com.seb_main_006.global.auth.jwt.CustomJwtErrorResponse;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class JwtReissueFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final OAuth2MemberSuccessHandler oAuth2MemberSuccessHandler; // Refactoring 이 필요할 수 있음..

    // JWT 를 검증하고 Authentication 객체를 SecurityContext 에 저장하기 위한 private 메서드
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Subject subject = jwtTokenizer.getSubject(token);
        String requestURI = request.getRequestURI();

        log.info("requestURI = {}", requestURI);

        if (requestURI.equals("/auth/reissue") && !subject.getTokenType().equals("RefreshToken")) {
            // 요청 URL 이 "/auth/reissue" 이지만, 토큰 타입이 "RefreshToken" 이 아닌 경우 -> 예외
            log.info("RefreshToken 이 아님");

            // ResponseBody 에 에러 메세지 세팅 및 에러 코드 설정
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            CustomJwtErrorResponse errorResponse = new CustomJwtErrorResponse(HttpStatus.UNAUTHORIZED.value(), "토큰을 확인해주세요");
            String result = objectMapper.writeValueAsString(errorResponse);
            response.getWriter().write(result);

            return;

        } else if (requestURI.equals("/auth/reissue") && subject.getTokenType().equals("RefreshToken")) {
            // 요청 URL 이 "/auth/reissue" 이고, 토큰 타입이 "RefreshToken" 인 경우 -> AccessToken 재발급

            // AccessToken 재발급
            String username = subject.getUsername(); // 유저 email
            List<String> authorities = refreshTokenRedisRepository.findByRefreshToken(token).getAuthorities();
            String newAccessToken = oAuth2MemberSuccessHandler.delegateAccessToken(username, authorities);

            // 응답 헤더에 재발급된 AccessToken 추가
            response.setHeader("Authorization", "Bearer " + newAccessToken);

            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !request.getRequestURI().equals("/auth/reissue");
    }

}
