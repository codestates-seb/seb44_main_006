package com.seb_main_006.domain.member.entity;

import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.bookmark.entity.Bookmark;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.like.entity.Likes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId; // 회원 식별자, 기본키

    @Column(nullable = false, updatable = false)
    private String memberEmail; // 회원 이메일, 필수값, 수정불가

    @Column(nullable = false)
    private String memberNickname; // 회원 닉네임, 필수값

    @Column
    private String memberImageUrl; // 회원 프로필 이미지 URL

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.ACTIVE; // 회원 활동 상태, 기본값이 활동중

    @Enumerated(EnumType.STRING)
    private Provider memberProvider; // 회원 활동 상태, 기본값이 활동중

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>(); // 계정권한(admin, user)

    @OneToMany(mappedBy = "member")
    private List<Course> courses = new ArrayList<>(); // course entity와 연관관계 매핑(1:다)

    @OneToMany(mappedBy = "member")
    private List<Answer> answersInMember = new ArrayList<>(); // answer entity와 연관관계 매핑(1:다)

    @OneToMany(mappedBy = "member")
    private List<Likes> likesInMember = new ArrayList<>(); // like entity와 연관관계 매핑(1:다)

    @OneToMany(mappedBy = "member")
    private List<Bookmark> bookmarksInMember = new ArrayList<>(); // bookmark entity와 연관관계 매핑(1:다)

    //로그인 할때 소셜에서 받아온 값들 저장용
    public Member(String email, String nickname, String imgURL, String provider) {
        this.memberEmail = email;
        this.memberNickname = nickname;
        this.memberImageUrl = imgURL;

        switch (provider) {
            case "google":
                this.memberProvider = Provider.GOOGLE;
                break;
            case "naver":
                this.memberProvider = Provider.NAVER;
                break;
            case "kakao":
                this.memberProvider = Provider.KAKAO;
                break;
            default:
                this.memberProvider = null;
        }
    }

    public Member(Long memberId) {
        this.memberId = memberId;
    }

    @Getter
    public enum MemberStatus {
        ACTIVE, DELETED;
    }

    @Getter
    public enum Provider {
        GOOGLE, NAVER, KAKAO;
    }
}
