package com.seb_main_006.global.auth.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

//클라이언트 측에서 전송된 request header 에 포함된 JWT 에 대해 검증 작업을 수행하는 클래스
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtil redisUtil;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 RedisUtil redisUtil, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisUtil = redisUtil;
        this.authorityUtils = authorityUtils;
    }

    // JWT 를 검증하고 Authentication 객체를 SecurityContext 에 저장하기 위한 private 메서드
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JwtVerificationFilter.doFilterInternal");

        System.out.println("request.getRequestURI() = " + request.getRequestURI()); // 왜 /auth/reissue 만 /login 으로 바뀌는지? /auth/test 는 잘 동작하는데...

        try {
            String token = "";
            if (!request.getRequestURI().equals("/auth/reissue")) {
                System.out.println("check00");
                token = request.getHeader("Authorization").replace("Bearer ", "");
            } else {
                System.out.println("check01");
                token = request.getHeader("RefreshToken");
            }

            System.out.println("check1");
            if (redisUtil.hasKeyBlackList(token)) {
                System.out.println("check2");
                throw new RuntimeException("다시 로그인 하십시오.");
            }

            verifyJws(request);// 토큰 유효성 검증
            System.out.println("check3");
            setAuthenticationToContext(token);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) { //만료된 것은 추가처리 필요함
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        System.out.println("check5");
        filterChain.doFilter(request, response);
    }

    //조건에 부합하지 않으면 이 필터를 적용하지 않고 다음 필터로 넘어감
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization"); // 잘못된 헤더 요청 시 예외 처리 어떻게?

        return authorization == null || request.getRequestURI().equals("/auth/reissue");
    }

    //JWT 를 검증하는 데 사용되는 private 메서드
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }

    //Authentication 객체를 SecurityContext 에 저장하기 위한 private 메서드
    protected void setAuthenticationToContext(String token) throws JsonProcessingException {
        System.out.println("check6");
        Jws<Claims> claims = jwtTokenizer.getClaims(token);
        List<String> roles = (List<String>) claims.getBody().get("roles");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(roles);

        UserDetails principal = new User(claims.getBody().get("username").toString(), "", authorities);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(principal, "", authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

}
