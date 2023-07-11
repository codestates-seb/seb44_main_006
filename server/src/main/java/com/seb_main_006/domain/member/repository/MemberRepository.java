package com.seb_main_006.domain.member.repository;

import com.seb_main_006.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface MemberRepository extends JpaRepository <Member, Long> {

    @Query("select m from Member m where m.memberEmail=:memberEmail and m.memberStatus='ACTIVE'")
    Optional<Member> findByMemberEmail(String memberEmail);

    @Query("select m from Member m where m.memberEmail=:memberEmail and m.memberStatus='DELETED'")
    Optional<Member> findDeletedUserByMemberEmail(String memberEmail);
}
