package com.seb_main_006.global.auth.attribute;

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

    public static MemberInfoResponseDto of(Member member, int myBookmarkCount) {
        return MemberInfoResponseDto.builder()
                .memberId(member.getMemberId())
                .memberEmail(member.getMemberEmail())
                .memberNickname(member.getMemberNickname())
                .memberImageUrl(member.getMemberImageUrl())
                .myCourseCount(member.getMyCourseCount())
                .myBookmarkCount(myBookmarkCount)
                .build();
    }
}
