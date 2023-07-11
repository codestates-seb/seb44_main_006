package com.seb_main_006.domain.member.dto;

import com.seb_main_006.domain.course.entity.Course;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
public class MemberBookmarked {

    private Long courseId;

    private Long postId;

    private String courseTitle;

    private String postContent;

    private String courseThumbnail;

    private String memberNickname;

    private Long courseLikeCount;

    private Long courseViewCount;

    private Boolean likeStatus;

    private LocalDateTime courseUpdatedAt;

    private LocalDateTime postCreatedAt;

    private List<String> tags;

    public MemberBookmarked(Course course, String memberNickname, Boolean likeStatus){

        this.courseId = course.getCourseId();
        this.postId = course.getPost().getPostId();
        this.courseTitle = course.getCourseTitle();
        this.postContent = course.getPost().getPostContent();
        this.courseThumbnail = course.getCourseThumbnail();
        this.memberNickname = memberNickname;
        this.courseLikeCount = course.getCourseLikeCount();
        this.courseViewCount = course.getCourseViewCount();
        this.likeStatus = likeStatus;
        this.courseUpdatedAt = course.getCourseUpdatedAt();
        this.postCreatedAt = course.getPost().getPostCreatedAt();
        this.tags = course.getPost().getPostTagsInPost().stream().map(postTag -> postTag.getTag().getTagName()).collect(Collectors.toList());
    }
}
