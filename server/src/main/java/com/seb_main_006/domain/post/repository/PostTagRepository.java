package com.seb_main_006.domain.post.repository;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.post.entity.PostTag;
import com.seb_main_006.domain.tag.entity.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {

    @Query("select c " +
            "from PostTag pt left join pt.post p join pt.post.course c " +
            "where pt.tag in :tagList " +
            "order by :sort desc ")
    List<Course> findByTagIn(@Param("tagList") List<Tag> tagList, @Param("sort") String sort, Pageable pageable);

}
