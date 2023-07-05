package com.seb_main_006.global.auth.handler;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.auth.jwt.Subject;
import com.seb_main_006.global.auth.redis.RefreshToken;
import com.seb_main_006.global.auth.redis.RefreshTokenRedisRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import com.seb_main_006.global.auth.utils.ErrorResponder;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService, RefreshTokenRedisRepository refreshTokenRedisRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
        this.refreshTokenRedisRepository = refreshTokenRedisRepository;
    }

    //소셜(구글)로그인 성공시 이메일, 닉네임, 프로필이미지 가져와서 DB에 저장 후 리다이렉트
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        log.info("oAuth2User.getAttributes()={}" , oAuth2User.getAttributes().get("id"));
        log.info("provider = {}", oAuth2User.getAttributes().get("provider")); // google, naver, kakao

        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
        String imgURL = String.valueOf(oAuth2User.getAttributes().get("picture"));
        String provider = String.valueOf(oAuth2User.getAttributes().get("provider"));
        List<String> authorities = authorityUtils.createRoles(email);

        // DB에 같은 이메일로 저장된 회원 정보가 존재하고, 현재 로그인하려는 Provider와 다를 경우 -> 이미 가입된 정보가 있음 예외 던지기
        String existProvider = memberService.findExistEmailAndDiffProvider(email, provider);
        log.info("existProvider = {}", existProvider);

        if (existProvider != null) {
            switch (existProvider) {
                case "GOOGLE":
                    ErrorResponder.sendErrorResponse(response, ExceptionCode.GOOGLE_ACCOUNT_EXISTS);
                    return;
                case "KAKAO":
                    ErrorResponder.sendErrorResponse(response, ExceptionCode.KAKAO_ACCOUNT_EXISTS);
                    return;
                case "NAVER":
                    ErrorResponder.sendErrorResponse(response, ExceptionCode.NAVER_ACCOUNT_EXISTS);
                    return;
                default:
                    break;
            }
        }

        saveMember(email, nickname, imgURL, provider);
        redirect(request, response, email, authorities);
    }

    //DB에 해당하는 사용자 정보 저장
    private Member saveMember(String email, String nickname, String imgURL, String provider) {
        Member member = new Member(email, nickname, imgURL, provider);
        return memberService.createMember(member);
    }

    //URL에 accessToken과 refreshToken 담아서 전달
    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);

        refreshTokenRedisRepository.save(RefreshToken.builder()
                .id(username)
                .username(username)
                .authorities(authorities)
                .refreshToken(refreshToken)
                .build());

        RefreshToken findToken = refreshTokenRedisRepository.findByRefreshToken(refreshToken);
        RefreshToken refreshToken2 = refreshTokenRedisRepository.findByUsername(findToken.getId());
        System.out.println("findToken.getId() = " + findToken.getId());
        System.out.println("refreshToken2 = " + refreshToken2);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    //accessToken 발급 메소드
    public String delegateAccessToken(String username, List<String> authorities) throws JsonProcessingException {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        Subject subject = new Subject(username, "AccessToken");

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    //refreshToken 발급 메소드
    private String delegateRefreshToken(String username) throws JsonProcessingException {
        Subject subject = new Subject(username, "RefreshToken");

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    //리다이렉트 URL생성(URL에 accessToken과 refreshToken담아서 전달)
    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();

        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(5173)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
    
    
}
