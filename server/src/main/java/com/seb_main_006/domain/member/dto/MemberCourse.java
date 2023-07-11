package com.seb_main_006.domain.member.dto;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.global.util.DateConverter;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class MemberCourse {

    private Long courseId;

    private String courseDday;

    private String courseTitle;

    private String courseContent;

    private String courseThumbnail;

    private String memberNickname;

    private Long courseLikeCount;

    private Long courseViewCount;

    private Boolean isPosted;

    private LocalDateTime courseUpdatedAt;

    public MemberCourse(Course course, String memberNickname){

        this.courseId = course.getCourseId();
        this.courseDday = DateConverter.localDateToStringWithDay(course.getCourseDday());
        this.courseTitle = course.getCourseTitle();
        this.courseContent = course.getCourseContent();
        this.courseThumbnail = course.getCourseThumbnail();
        this.memberNickname = memberNickname;
        this.courseLikeCount = course.getCourseLikeCount();
        this.courseViewCount = course.getCourseViewCount();
        this.isPosted = course.isPosted();
        this.courseUpdatedAt = course.getCourseUpdatedAt();
    }
}
