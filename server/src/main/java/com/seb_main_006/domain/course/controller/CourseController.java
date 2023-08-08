package com.seb_main_006.domain.course.controller;

import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
@Validated
public class CourseController {

    private final CourseService courseService;

    // 일정 생성
    @PostMapping
    public ResponseEntity postCourse(@Valid @RequestBody CoursePostDto coursePostDto,
                                     @AuthenticationPrincipal(expression = "username") String memberEmail){
        // @AuthenticationPrincipal로 현재 저장되어있는 이메일 가져옴 -> customUserDetail이 없어서 @AuthenticationPrincipal를 통해 userDetail 구현한후 객체를 주입함

        Course createdCourse = courseService.createCourse(coursePostDto, memberEmail);

        // 응답 헤더에 리소스 위치 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(Long.toString(createdCourse.getCourseId())));

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    // 일정 상세조회
    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourse(@PathVariable @Positive Long courseId,
                                       @AuthenticationPrincipal(expression = "username") String memberEmail) {

        CoursePostDto response = courseService.findCourse(courseId, memberEmail);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 일정 공유 페이지
    @GetMapping("/{courseId}/share")
    public ResponseEntity<?> getCourseShare(@PathVariable @Positive Long courseId) {

        CoursePostDto response = courseService.findCourseShare(courseId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 일정 수정
    @PatchMapping("/{course-id}")
    public ResponseEntity patchCourse(@Valid @PathVariable("course-id") long courseId,
                                      @RequestBody CoursePostDto coursePostDto,
                                      @AuthenticationPrincipal(expression = "username") String memberEmail) {
        courseService.updateCourse(coursePostDto, memberEmail, courseId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 일정 삭제
    @DeleteMapping("/{course-id}")
    public ResponseEntity patchCourse(@PathVariable("course-id") @Positive long courseId,
                                      @AuthenticationPrincipal(expression = "username") String memberEmail) {

        courseService.deleteCourse(courseId, memberEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
