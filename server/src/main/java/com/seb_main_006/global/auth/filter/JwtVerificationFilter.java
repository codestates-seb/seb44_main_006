package com.seb_main_006.global.auth.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import com.seb_main_006.global.auth.utils.ErrorResponder;
import com.seb_main_006.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 클라이언트 측에서 전송된 request header 에 포함된 JWT 에 대해 검증 작업을 수행하는 클래스
 */
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtil redisUtil;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, RedisUtil redisUtil, CustomAuthorityUtils authorityUtils, RefreshTokenRedisRepository refreshTokenRedisRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisUtil = redisUtil;
        this.authorityUtils = authorityUtils;
        this.refreshTokenRedisRepository = refreshTokenRedisRepository;
    }


    // JWT 를 검증하고 Authentication 객체를 SecurityContext 에 저장하기 위한 private 메서드
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("requestURI = {}", request.getRequestURI());

        String AuthorizationHeader = request.getHeader("Authorization");
        boolean isReissue = request.getRequestURI().equals("/auth/reissue");
        String token = "";

        if (AuthorizationHeader == null || AuthorizationHeader.replaceAll("Bearer ", "").length() == 0) {
            ErrorResponder.sendErrorResponse(response, ExceptionCode.IM_A_TEAPOT);
            return;
        }

        try {
            if (!isReissue) {
                log.info("check: not reissue");
                token = AuthorizationHeader.replace("Bearer ", "");
            } else {
                log.info("check: reissue");
                token = request.getHeader("RefreshToken");
            }

            // AccessToken이 블랙리스트에 토큰이 저장되어 있다면 -> 토큰 만료 에러
            if (redisUtil.hasKeyBlackList(AuthorizationHeader.replaceAll("Bearer", ""))) {
                log.info("check: 로그아웃된 AccessToken");
                ErrorResponder.sendErrorResponse(response, ExceptionCode.TOKEN_EXPIRED);
                return;
            }

            verifyJws(request, token);// 토큰 유효성 검증
            setAuthenticationToContext(token, isReissue);

        } catch (SignatureException se) {
            request.setAttribute("signatureException", se);
        } catch (ExpiredJwtException ee) {
            log.info("expiredJwtException 발생");
            request.setAttribute("exception", ee);
            ErrorResponder.sendErrorResponse(response, ExceptionCode.TOKEN_EXPIRED);
            return;
        } catch (IllegalArgumentException ie) {
            log.info("IllegalArgumentException 발생(토큰 없음)");
            request.setAttribute("exception", ie);
            ErrorResponder.sendErrorResponse(response, ExceptionCode.IM_A_TEAPOT);
            return;
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    // 조건에 부합하지 않으면 이 필터를 적용하지 않고 다음 필터로 넘어감
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestURI = request.getRequestURI();

        return requestURI.equals("/auth/members") || requestURI.startsWith("/posts/tagged");
    }

    // JWT 를 검증하는 데 사용되는 private 메서드
    private Map<String, Object> verifyJws(HttpServletRequest request, String token) {

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();
    }

    // Authentication 객체를 SecurityContext 에 저장하기 위한 private 메서드
    protected void setAuthenticationToContext(String token, Boolean isReissue) throws JsonProcessingException {

        Jws<Claims> claims = jwtTokenizer.getClaims(token);
        List<String> roles = null;
        String username = null;

        if (isReissue) {
            RefreshToken refreshTokenInfo = refreshTokenRedisRepository.findByRefreshToken(token);
            roles = refreshTokenInfo.getAuthorities();
            username = refreshTokenInfo.getUsername();
        } else {
            roles = (List<String>) claims.getBody().get("roles");
            username = claims.getBody().get("username").toString();
        }

        System.out.println("roles = " + roles);
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(roles);

        UserDetails principal = new User(username, "", authorities);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(principal, "", authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
