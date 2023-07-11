package com.seb_main_006.global.auth.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtTokenizer {

    private final ObjectMapper objectMapper;

    // 환경 변수 정의
    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    // Plain Text 형태인 Secret Key 의 byte 를 Base64 형식의 문자열로 인코딩해주는 메서드
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // 인증된 사용자에게 JWT 를 최초로 발급해 주기 위한 JWT 생성 메서드
    public String generateAccessToken(Map<String, Object> claims,
                                      Subject subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) throws JsonProcessingException {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        String subjectStr = objectMapper.writeValueAsString(subject);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subjectStr)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateAccessToken(String username, List<String> authorities) throws JsonProcessingException {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        Subject subject = new Subject(username, "AccessToken");
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        return generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    // Access Token 이 만료되었을 경우, Access Token 을 새로 생성할 수 있게 해주는 Refresh Token 을 생성하는 메서드
    public String generateRefreshToken(Subject subject, Date expiration, String base64EncodedSecretKey) throws JsonProcessingException {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        String subjectStr = objectMapper.writeValueAsString(subject);

        return Jwts.builder()
                .setSubject(subjectStr)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String token) {

        return getClaims(token, encodeBase64SecretKey(secretKey));
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // JWT 의 만료 일시를 지정하기 위한 메서드
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    // JWT 의 서명에 사용할 Secret Key 를 생성해주는 메서드
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) { //암호화 된 키를 가져와서
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);   //복호화를 시킨뒤
        Key key = Keys.hmacShaKeyFor(keyBytes);  // 적절한 HMAC 알고리즘을 적용한 Key 객체를 생성

        return key;
    }

    // JWT 토큰 생성 시 Token 타입 정보까지 Subject에 추가, String으로 직렬화된 Subject 를 객체로 변환하여 리턴
    public Subject getSubject(String token) throws JsonProcessingException {
        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        String subjectStr = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
        return objectMapper.readValue(subjectStr, Subject.class);
    }
}
