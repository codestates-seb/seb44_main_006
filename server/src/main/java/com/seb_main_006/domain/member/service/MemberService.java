package com.seb_main_006.domain.member.service;

import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.repository.MemberRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {


    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    public MemberService(MemberRepository memberRepository, CustomAuthorityUtils customAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    // 구글 로그인 회원 가입
    public Member createMember(Member member) {
        if (!verifyExistEmail(member.getMemberEmail())) { // DB에 이메일이 존재하지 않을 때만 회원 가입 로직 수행

            // DB에 member Role 저장
            List<String> roles = customAuthorityUtils.createRoles(member.getMemberEmail());
            member.setRoles(roles);

            member = memberRepository.save(member);
        }
        return member;
    }

    private boolean verifyExistEmail(String userEmail) {

        Optional<Member> user= memberRepository.findByMemberEmail(userEmail);
        return user.isPresent();
    }


}
