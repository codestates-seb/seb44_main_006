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
import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Long> {

        @Query("select c from Course c where c.isPosted = true")
        Page<Course> findAllByPosted(Pageable pageable);

        List<Course> findAllByMember(Member member);

        @Query("select c from Course c join c.post p where c.isPosted = true " +
                "order by p.postCreatedAt desc")
        Page<Course> findAllByPostedOrderByUpdatedAt(PageRequest pageRequest);

        @Query("select c from Course c join c.post p where c.isPosted = true " +
                "order by c.courseLikeCount desc, p.postCreatedAt desc ")
        Page<Course> findAllByPostedOrderByLikeCount(PageRequest pageRequest);

        @Query("select distinct c from Course c join c.post p join p.postTagsInPost pt join pt.tag t " +
                "where c.isPosted = true and (c.courseTitle like %:inputWord% or t.tagName like %:inputWord% or p.postContent like %:inputWord%) ")
        List<Course> searchCourseOrderByUpdatedAt(@Param("inputWord") String inputWord);

}
