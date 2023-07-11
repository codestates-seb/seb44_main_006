package com.seb_main_006.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
public class MyPageResponseDto {

    private List<MemberCourse> memberCourseList;

    private List<MemberBookmarked> memberBookmarkedList;
}
