package com.seb_main_006.global.auth.handler;

import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.utils.ErrorResponder;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final JwtTokenizer jwtTokenizer;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");

        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        String errorClassName = exception != null ? exception.getClass().getName() : authException.getClass().getName();
        log.warn("Unauthorized error happened: {}-{}", message, errorClassName);
    }
}