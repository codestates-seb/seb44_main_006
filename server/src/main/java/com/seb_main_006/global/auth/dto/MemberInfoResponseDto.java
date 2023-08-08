package com.seb_main_006.global.auth.dto;

import com.seb_main_006.domain.member.entity.Member;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponseDto {

    private Long memberId;
    private String memberEmail;
    private String memberNickname;
    private String memberImageUrl;
    private Integer myBookmarkCount;
    private Integer myCourseCount;
    private Boolean isAdmin;

    public static MemberInfoResponseDto of(Member member, int myCourseCount, int myBookmarkCount, boolean isAdmin) {
        return MemberInfoResponseDto.builder()
                .memberId(member.getMemberId())
                .memberEmail(member.getMemberEmail())
                .memberNickname(member.getMemberNickname())
                .memberImageUrl(member.getMemberImageUrl())
                .myBookmarkCount(myBookmarkCount)
                .myCourseCount(myCourseCount)
                .isAdmin(isAdmin)
                .build();
    }
}
