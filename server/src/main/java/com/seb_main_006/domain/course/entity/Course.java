package com.seb_main_006.domain.course.entity;

import com.seb_main_006.domain.bookmark.entity.Bookmark;
import com.seb_main_006.domain.destination.entity.Destination;
import com.seb_main_006.domain.like.entity.Likes;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.post.entity.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId; // 코스 식별자, 기본키

    @Column
    private String courseTitle; // 코스 타이틀

    @Column
    private LocalDate courseDday; // 코스 디데이

    @Column(columnDefinition = "TEXT")
    private String courseContent; // 코스 설명

    @Column
    private boolean isPosted; // 커뮤니티 게시 여부

    @CreatedDate
    private LocalDateTime courseCreatedAt; // 코스 생성일자

    @Column
    private LocalDateTime courseUpdatedAt = LocalDateTime.now(); // 코스 수정일자

    @Column
    private String courseThumbnail; // 코스 썸네일 이미지URL

    @Column
    private long courseLikeCount; // 좋아요 수

    @Column
    private long courseViewCount; // 조회 수

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // member entity와 연관관계 매핑(다:1)

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Post post; // post entity와 연관관계 매핑(1:1)

    @BatchSize(size = 100)
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Destination> destinations = new ArrayList<>(); // destination entity와 연관관계 매핑(1:다)

    @BatchSize(size = 100)
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Likes> likesInCourse = new ArrayList<>(); // like entity와 연관관계 매핑(1:다)

    @BatchSize(size = 100)
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarksInCourse = new ArrayList<>(); // bookmark entity와 연관관계 매핑(1:다)

    public void removePost() {
        this.setPosted(false);
        this.setPost(null);
        this.setCourseLikeCount(0);
        this.setCourseViewCount(0);
        this.getLikesInCourse().clear();
        this.getBookmarksInCourse().clear();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Course)) return false;
        Course course = (Course) o;
        return courseId == course.courseId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseId);
    }
}


