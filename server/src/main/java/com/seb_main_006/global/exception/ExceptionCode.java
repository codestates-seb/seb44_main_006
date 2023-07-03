package com.seb_main_006.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404,"사용자를 찾을 수 없습니다."),
    MEMBER_EXISTS(409,"사용자가 이미 존재 합니다."),
    MEMBER_NO_HAVE_AUTHORIZATION(401,"인증되지 않은 사용자입니다."),
    MEMBERS_NOT_VALID(409, "등록되지 않은 사용자입니다."),
    INVALID_MEMBER_STATUS(400,"잘못된 사용자 상태입니다."),
    MEMBER_DOES_NOT_MATCH(403,"사용자가 맞지 않습니다."),
    COURSE_NOT_FOUND(404,"일정을 찾을 수 없습니다."),
    COURSE_CANNOT_CHANGE(403,"일정을 수정 할 수 없습니다."),
    COURSE_CANNOT_DELETE(403,"일정을 삭제 할 수 없습니다."),
    COURSE_HAS_BEEN_DELETED(403,"일정이 삭제 되었습니다."),
    ANSWER_NOT_FOUND(404,"답변을 찾을 수 없습니다."),
    ANSWER_EXISTS(409, "답변이 이미 존재 합니다."),
    ANSWER_CANNOT_CHANGE(403,"답변을 수정 할 수 없습니다."),
    ANSWER_CANNOT_DELETE(403,"답변을 삭제 할 수 없습니다."),
    NOT_IMPLEMENTATION(501,"Not Implementation");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
