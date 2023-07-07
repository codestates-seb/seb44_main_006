package com.seb_main_006.domain.tag.repository;


import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByTagName(String tagName);

    List<Tag> findByTagNameContaining(String tagName);

//    @Query("select distinct t from Tag t where t.tagName like :tagNames and t.tagName in :tagNames ")
//    List<Tag> findByTagNameContainingV2(List<String> tagNames);
}
