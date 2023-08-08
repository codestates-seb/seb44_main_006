package com.seb_main_006.global.auth.jwt;

import lombok.Getter;

@Getter
public class Subject {

    private final String username; // 유저 email

    private final String tokenType;

    public Subject(String username, String tokenType) {
        this.username = username;
        this.tokenType = tokenType;
    }
}