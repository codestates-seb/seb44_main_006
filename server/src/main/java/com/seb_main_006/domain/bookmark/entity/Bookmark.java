package com.seb_main_006.domain.bookmark.entity;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId; // 즐겨찾기 식별자, 기본키

    @Column
    private Long postId; // 게시글 식별자

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member; // member entity와 연관관계 매핑(다:1)

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course; // course entity와 연관관계 매핑(다:1)
}