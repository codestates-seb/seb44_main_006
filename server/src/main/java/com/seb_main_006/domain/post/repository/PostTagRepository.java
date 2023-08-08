package com.seb_main_006.domain.post.repository;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.post.entity.PostTag;
import com.seb_main_006.domain.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {

    @Query("select distinct c " +
            "from PostTag pt join pt.post p join pt.post.course c " +
            "where pt.tag in :tagList " +
            "order by c.courseUpdatedAt desc ")
    Page<Course> findByTagInOrderByUpdatedAt(@Param("tagList") List<Tag> tagList, Pageable pageable);
    
    @Query("select distinct c " +
            "from PostTag pt join pt.post p join pt.post.course c " +
            "where pt.tag in :tagList " +
            "order by c.courseLikeCount desc, c.courseUpdatedAt desc ")
    Page<Course> findByTagInOrderByLikeCount(@Param("tagList") List<Tag> tagList, Pageable pageable);

    @Query("select distinct c " +
            "from Course c join fetch c.post p join fetch p.postTagsInPost pt " +
            "where pt.tag in :tagList ")
    List<Course> findByTagInOrderByWord(@Param("tagList") List<Tag> tagList);

}
