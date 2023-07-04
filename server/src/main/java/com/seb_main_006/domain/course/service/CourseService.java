package com.seb_main_006.domain.course.service;

import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final MemberService memberService;

    @Transactional
    public Course createCourse(CoursePostDto coursePostDto, String memberEmail){

        Member findmember = memberService.getMeber(memberEmail);

        Course course = new Course();

        course.getMember().setMemberId(findmember.getMemberId());
        course.setCourseDday(coursePostDto.getCourseDday());
        course.setCourseTitle(coursePostDto.getCourseTitle());
        course.setCourseContent(coursePostDto.getCourseContent());
        course.setCourseThumbnail(coursePostDto.getCourseThumbnail());

        return courseRepository.save(course);
    }
}
