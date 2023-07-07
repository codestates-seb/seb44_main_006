package com.seb_main_006.domain.course.repository;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

        @Query("select c from Course c where c.isPosted =:isPosted")
        Page<Course> findAllByPosted(@Param("isPosted") Boolean isPosted, Pageable pageable);

        List<Course> findAllByMember(Member member);
}
