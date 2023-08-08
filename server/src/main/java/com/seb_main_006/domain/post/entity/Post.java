package com.seb_main_006.domain.post.entity;

import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.course.entity.Course;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId; // 게시글 식별자, 기본키

    @Column(columnDefinition = "TEXT")
    private String postContent; // 게시글 설명

    @CreatedDate
    private LocalDateTime postCreatedAt; // 코스 생성일자

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course; // course entity와 연관관계 매핑(1:1)

    @BatchSize(size = 50)
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostTag> postTagsInPost = new ArrayList<>(); // postTag entity와 연관관계 매핑(1:다)

    @BatchSize(size = 50)
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Answer> answersInPost = new ArrayList<>(); // answer entity와 연관관계 매핑(1:다)

}
