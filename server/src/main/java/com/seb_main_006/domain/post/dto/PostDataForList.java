package com.seb_main_006.domain.post.dto;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.member.entity.Member;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDataForList {

    private Long courseId;
    private Long postId;
    private String courseTitle;
    private String courseContent;
    private String courseThumbnail;
    private String memberNickname;
    private Long courseLikeCount; // 받은 좋아요 수
    private Long courseViewCount; // 게시글 조회수
    private boolean likeStatus; // 로그인한 유저가 해당 게시글에 대해 좋아요를 했는지 안했는지
    private boolean bookmarkStatus; // 로그인한 유저가 해당 게시글에 대해 즐겨찾기를 했는지 안했는지
    private LocalDateTime courseUpdatedAt;
    private List<String> tags;

}
