package com.seb_main_006.global.exception;

import lombok.Getter;
import lombok.Setter;

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
    ANSWER_NOT_FOUND(404,"댓글을 찾을 수 없습니다."),
    ANSWER_EXISTS(409, "답변이 이미 존재 합니다."),
    ANSWER_CANNOT_CHANGE(403,"답변을 수정 할 수 없습니다."),
    ANSWER_CANNOT_DELETE(403,"답변을 삭제 할 수 없습니다."),
    NOT_IMPLEMENTATION(501,"Not Implementation"),
    TOKEN_EXPIRED(444,"토큰이 만료되었습니다. 다시 로그인해주세요."),
    IM_A_TEAPOT(418,"주전자가 비어있습니다. 커피를 넣어주세요"),
    GOOGLE_ACCOUNT_EXISTS(409,"이미 구글로 가입된 사용자입니다."),
    NAVER_ACCOUNT_EXISTS(409,"이미 네이버로 가입된 사용자입니다."),
    KAKAO_ACCOUNT_EXISTS(409,"이미 카카오로 가입된 사용자입니다."),
    POST_EXISTS(409,"선택하신 코스로 작성한 게시글이 이미 존재합니다."),
    CANT_LIKE_BOOKMARK(403,"본인글에는 좋아요나 즐겨찾기를 할 수 없습니다."),
    ANSWER_CANT_UPDATE_DELETE(403,"본인글이 아니면 수정,삭제 할 수 없습니다."),
    CANT_BOOKMARK_NOT_FOUND(404,"선택한 코스로 작성된 게시글이 없어 즐겨찾기를 할 수 없습니다."),
    CANT_LIKE_NOT_FOUND(404,"선택한 코스로 작성된 게시글이 없어 좋아요를 할 수 없습니다."),
    POST_NOT_FOUND(404,"게시글을 찾을 수 없습니다.");

    @Getter
    private int status;

    @Getter
    @Setter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
