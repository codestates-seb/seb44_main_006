package com.seb_main_006.domain.member.entity;

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
    private Long memberId;

    @Column(nullable = false, updatable = false)
    private String memberEmail;

    @Column(nullable = false)
    private String memberNickname;

    @Column
    private String memberImageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email, String nickname, String imgURL) {
        this.memberEmail = email;
        this.memberNickname = nickname;
        this.memberImageUrl = imgURL;
    }



}
