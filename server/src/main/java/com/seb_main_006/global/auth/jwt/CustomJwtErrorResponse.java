package com.seb_main_006.global.auth.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomJwtErrorResponse {

    private int status;

    private String message;

    public CustomJwtErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
