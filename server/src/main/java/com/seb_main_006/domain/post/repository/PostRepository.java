package com.seb_main_006.domain.post.repository;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByCourse(Course course);

    @Query("select distinct c from Post p join p.course c " +
            "where replace(c.courseTitle, ' ', '') like %:inputWord%")
    List<Course> searchCourseOrderByWord(@Param("inputWord") String inputWord);
}
