package com.seb_main_006.domain.post.dto;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDataForList {

    private Long courseId;
    private Long postId;
    private String courseTitle;
    private String postContent;
    private String courseThumbnail;
    private String memberNickname;
    private String memberEmail;
    private Long courseLikeCount; // 받은 좋아요 수
    private Long courseViewCount; // 게시글 조회수
    private boolean likeStatus; // 로그인한 유저가 해당 게시글에 대해 좋아요를 했는지 안했는지
    private boolean bookmarkStatus; // 로그인한 유저가 해당 게시글에 대해 즐겨찾기를 했는지 안했는지
    private LocalDateTime courseUpdatedAt;
    private LocalDateTime postCreatedAt;
    private List<String> tags;

    public static PostDataForList of(Course course, boolean likeStatus, boolean bookmarkStatus) {
        return PostDataForList.builder()
                .courseId(course.getCourseId())
                .postId(course.getPost().getPostId())
                .courseTitle(course.getCourseTitle())
                .postContent(course.getPost().getPostContent())
                .courseThumbnail(course.getCourseThumbnail())
                .memberNickname(course.getMember().getMemberNickname())
                .memberEmail(course.getMember().getMemberEmail())
                .courseLikeCount(course.getCourseLikeCount())
                .courseViewCount(course.getCourseViewCount())
                .likeStatus(likeStatus)
                .bookmarkStatus(bookmarkStatus)
                .courseUpdatedAt(course.getCourseUpdatedAt())
                .postCreatedAt(course.getPost().getPostCreatedAt())
                .tags(course.getPost().getPostTagsInPost().stream().map(postTag -> postTag.getTag().getTagName()).collect(Collectors.toList()))
                .build();
    }
}
