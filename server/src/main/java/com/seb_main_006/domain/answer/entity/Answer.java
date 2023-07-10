package com.seb_main_006.domain.answer.entity;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId; // 답변 식별자, 기본키

    @Column(columnDefinition = "TEXT")
    private String answerContent; // 답변 내용

    @CreatedDate
    private LocalDateTime answerCreatedAt; // 답변 생성일자

    @Column
    private LocalDateTime answerUpdatedAt = LocalDateTime.now(); // 답변 수정일자

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post; // post entity와 연관관계 매핑(다:1)

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member; // member entity와 연관관계 매핑(다:1)

    public void addPost(Post post){
        this.post = post;

        if(!post.getAnswersInPost().contains(this)){
            post.getAnswersInPost().add(this);
        }
    }

}
