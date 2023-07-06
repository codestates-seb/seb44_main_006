package com.seb_main_006.domain.member.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MemberPatchDto {

    @NotBlank
    private String memberNickname;

}
