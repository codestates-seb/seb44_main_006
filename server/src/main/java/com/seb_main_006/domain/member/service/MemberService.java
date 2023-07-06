package com.seb_main_006.domain.member.service;

import com.seb_main_006.domain.member.dto.MemberPatchDto;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.repository.MemberRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {


    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    public MemberService(MemberRepository memberRepository, CustomAuthorityUtils customAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    /**
     * 소셜 로그인 회원 가입
     */
    public Member createMember(Member member) {

        // DB에 이메일이 존재하지 않을 때만 회원 가입 로직 수행
        if (!verifyExistEmail(member.getMemberEmail())) {

            member.setRoles(customAuthorityUtils.createRoles(member.getMemberEmail())); // member Role 저장
            return memberRepository.save(member);
        }

        return findExistMember(member.getMemberEmail()); // DB에 이메일(계정)이 존재하면 DB에 저장된 Member 반환
    }

    /**
     * 회원 정보 수정 (현재 닉네임만 수정)
     */
    public void updateMember(MemberPatchDto memberPatchDto, String memberEmail) {

        Member findMember = findVerifiedMember(memberEmail);
        findMember.setMemberNickname(memberPatchDto.getMemberNickname());
    }


    // 이메일로 DB에서 회원을 조회하고, 현재 가입된 provider 정보 String으로 반환 (GOOGLE, NAVER, KAKAO, null)
    public String findExistEmailAndDiffProvider(String userEmail, String currentProvider) {

        Optional<Member> optionalMember = memberRepository.findByMemberEmail(userEmail);

        // DB에 이메일(가입된 계정)이 존재하고, 그 계정의 provider가 현재 로그인하려는 provider와 같을 경우에는 null 로 반환
        // handler에서 예외 처리 로직을 타지 않도록 하기 위함
        if (optionalMember.isPresent() && optionalMember.get().getMemberProvider().toString().equalsIgnoreCase(currentProvider)) {
            return null;
        }
        return optionalMember.isEmpty() ? null : optionalMember.get().getMemberProvider().toString();
    }

    // DB에 이메일(계정) 존재 여부 Boolean 타입으로 반환
    private boolean verifyExistEmail(String userEmail) {

        Optional<Member> user = memberRepository.findByMemberEmail(userEmail);
        return user.isPresent();
    }

    // DB에서 회원 조회 (해당 email을 가진 회원이 없을 경우 예외X -> null 반환)
    private Member findExistMember(String userEmail) {

        Optional<Member> optionalMember = memberRepository.findByMemberEmail(userEmail);
        return optionalMember.isEmpty() ? null : optionalMember.get();
    }

    // DB에서 회원 조회 (해당 email을 가진 회원이 없을 경우 예외)
    public Member findVerifiedMember(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
