package com.seb_main_006.domain.post.repository;

import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByCourse(Course course);

}
