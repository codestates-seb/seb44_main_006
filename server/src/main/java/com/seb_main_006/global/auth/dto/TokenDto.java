package com.seb_main_006.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenDto {

    private String accessToken;
    private String refreshToken;

}
