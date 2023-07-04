package com.seb_main_006.domain.course.repository;

import com.seb_main_006.domain.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
