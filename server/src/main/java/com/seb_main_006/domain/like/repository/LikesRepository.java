package com.seb_main_006.domain.like.repository;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.like.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findLikesByCourse(Course course);
}
