package com.seb_main_006.domain.post.dto;

import com.seb_main_006.domain.answer.dto.AnswerResponseDto;
import com.seb_main_006.domain.course.dto.CourseInfoDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostDetailResponseDto {
    private String postId; // 고유값(게시글 식별자)
    private String  memberNickname; // 작성자 닉네임
    private String memberEmail; // 작성자 이메일(작성자 식별자)
    private String memberImageUrl; // 작성자 프로필 이미지 URL
    private String courseTitle;  // 게시글 제목(일정 제목과 동일)
    private String postContent;  // 게시글 내용(커뮤니티 작성시에만 사용)
    private List<String> tags; // 태그(키워드)
    private long courseViewCount;   // 조회수
    private long courseLikeCount;   // 받은 좋아요 수
    private boolean likeStatus;  //유저가 이 글에 좋아요했는지 안했는지
    private boolean bookmarkStatus; //유저가 이 글에 즐겨찾기했는지 안했는지
    private LocalDateTime courseUpdatedAt;
    private LocalDateTime postCreatedAt;
    private CourseInfoDto courseInfo;
    private List<AnswerResponseDto> answerList;
}
