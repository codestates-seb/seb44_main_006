package com.seb_main_006.global.auth.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;

// 각각의 registrationId에 따라 attributes의 정보들을 다르게 추출 -> 유저의 정보를 반환해 주는 JSON이 다름
@Slf4j
@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attribute {

    private Map<String, Object> attributes;
    private String attributeKey;
    private String provider;
    private String email;
    private String name;
    private String picture;

    public static OAuth2Attribute of(String provider, String attributeKey,
                                     Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(attributeKey, attributes);
            case "kakao":
                return ofKakao(attributeKey, attributes);
            case "naver":
                return ofNaver(attributeKey, attributes);
            default:
                System.out.println("예외 던짐!!");
                return null;
        }
    }

    private static OAuth2Attribute ofGoogle(String attributeKey,
                                            Map<String, Object> attributes) {
        return OAuth2Attribute.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .attributeKey((String) attributes.get(attributeKey))
                .provider("google")
                .build();
    }

    private static OAuth2Attribute ofKakao(String attributeKey,
                                           Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuth2Attribute.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .attributes(kakaoAccount)
                .attributeKey(String.valueOf(attributes.get(attributeKey)))
                .provider("kakao")
                .build();
    }

    private static OAuth2Attribute ofNaver(String attributeKey,
                                           Map<String, Object> attributes) {
        Map<String, Object> naverResponse = (Map<String, Object>) attributes.get("response");

        System.out.println("naverResponse = " + naverResponse);

        return OAuth2Attribute.builder()
                .name((String) naverResponse.get("nickname"))
                .email((String) naverResponse.get("email"))
                .picture((String) naverResponse.get("profile_image"))
                .attributes(naverResponse)
                .attributeKey(String.valueOf(attributes.get(attributeKey)))
                .provider("naver")
                .build();
    }

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("provider", provider);
        map.put("name", name);
        map.put("email", email);
        map.put("picture", picture);

        return map;
    }
}