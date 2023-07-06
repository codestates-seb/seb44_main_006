package com.seb_main_006.domain.tag.repository;


import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByTagName(String tagName);

    List<Tag> findByTagNameContaining(String tagName);
}
