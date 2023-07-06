package com.seb_main_006.domain.answer.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerResponsePostDto {
    private String answerId;
    private String answererEmail;
    private String answererNickname;
    private String answerContent;
    private String answererImageUrl;
    private String answerUpdatedAt;
}
