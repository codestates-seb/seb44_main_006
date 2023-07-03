package com.seb_main_006.domain.member.repository;

import com.seb_main_006.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository <Member, Long> {

    Optional<Member> findByMemberEmail(String memberEmail);
}
