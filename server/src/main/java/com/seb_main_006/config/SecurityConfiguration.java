package com.seb_main_006.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.auth.filter.JwtVerificationFilter;
import com.seb_main_006.global.auth.handler.MemberAccessDeniedHandler;
import com.seb_main_006.global.auth.handler.MemberAuthenticationEntryPoint;
import com.seb_main_006.global.auth.handler.OAuth2MemberSuccessHandler;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.redis.RedisUtil;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.*;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final RedisUtil redisUtil;
    private final ObjectMapper objectMapper;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    //필터체인 설정(초기라서 permitAll로 설정)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable() // CSRF 토큰 미사용 (JWT 토큰 사용)
                .cors(withDefaults()) // CORS 적용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 미사용
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // (1) 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers(HttpMethod.POST, "/auth/reissue").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.POST, "/auth/logout").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.GET, "/auth/test").hasAnyRole("USER","ADMIN")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        // 소셜 로그인 성공 시 수행되는 핸들러 설정
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService, refreshTokenRedisRepository)));


        return http.build();
    }

    //CORS 설정(초기라서 우선 다 열어놓음)
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(""));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("")); // 클라이언트에서 요청할 때 허용할 요청 헤더 설정
        configuration.setExposedHeaders(Arrays.asList("*")); // 클라이언트로 노출할 응답 헤더 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // JWT 토큰 검증 필터 생성 및 필터 순서 설정 : 인증(일반로그인 or 소셜로그인) 필터 다음에 적용
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, redisUtil, authorityUtils);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, UsernamePasswordAuthenticationFilter.class);
        }
    }
}

