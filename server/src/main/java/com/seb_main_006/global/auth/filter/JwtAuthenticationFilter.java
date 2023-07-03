package com.seb_main_006.global.auth.filter;

import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private  final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    // 토큰에서 꺼내온 유저 정보를 SecurityContextHolder 에 넣기 (그래야 시큐리티 인증 동작, 컨트롤러에서 유저 정보 사용 가능)
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");

        if (!request.getRequestURI().equals("/auth/reissue")) {

            Jws<Claims> claims = jwtTokenizer.getClaims(token);
            List<String> roles = (List<String>) claims.getBody().get("roles");
            List<GrantedAuthority> authorities = authorityUtils.createAuthorities(roles);

            UserDetails principal = new User(claims.getBody().get("username").toString(), "", authorities);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(principal, "", authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }

    //조건에 부합하지 않으면 이 필터를 적용하지 않고 다음 필터로 넘어감
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        String authorization = request.getHeader("Authorization");
//
//        return authorization == null || !authorization.startsWith("Bearer") || request.getRequestURI().equals("/auth/reissue");
//    }
}
