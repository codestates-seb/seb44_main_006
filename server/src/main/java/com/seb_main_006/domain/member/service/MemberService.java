package com.seb_main_006.domain.member.service;

import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.repository.MemberRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
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

    // 소셜 로그인 회원 가입
    public Member createMember(Member member) {

        // DB에 이메일이 존재하지 않을 때만 회원 가입 로직 수행
        if (!verifyExistEmail(member.getMemberEmail())) {

            // DB에 member Role 저장
            List<String> roles = customAuthorityUtils.createRoles(member.getMemberEmail());
            member.setRoles(roles);

            return memberRepository.save(member);
        }

        // DB에 이메일(계정)이 존재하면 DB에 저장된 Member 반환
        return findExistMember(member.getMemberEmail());
    }

    // 이메일로 DB에서 회원을 조회하고, 현재 가입된 provider 정보 String으로 반환
    // (GOOGLE, NAVER, KAKAO, null), OAuth2MemberSuccessHandler에서 호출
    public String findExistEmailAndDiffProvider(String userEmail, String currentProvider) {

        Optional<Member> optionalMember = memberRepository.findByMemberEmail(userEmail);

        // DB에 이메일(가입된 계정)이 존재하고, 그 계정의 provider가 현재 로그인하려는 provider와 같을 경우에는 null 로 반환
        // handler에서 예외 처리 로직을 타지 않도록 하기 위함
        if (optionalMember.isPresent() && optionalMember.get().getMemberProvider().toString().equalsIgnoreCase(currentProvider)) {
            return null;
        }
        return optionalMember.isEmpty() ? null : optionalMember.get().getMemberProvider().toString();
    }

    private boolean verifyExistEmail(String userEmail) {

        Optional<Member> user= memberRepository.findByMemberEmail(userEmail);
        return user.isPresent();
    }

    private Member findExistMember(String userEmail) {

        Optional<Member> optionalMember = memberRepository.findByMemberEmail(userEmail);
        return optionalMember.isEmpty() ? null : optionalMember.get();
    }

    public Member findVerifiedMember(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}
