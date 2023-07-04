package com.seb_main_006.domain.course.controller;

import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.mapper.CourseMapper;
import com.seb_main_006.domain.course.service.CourseService;
import com.seb_main_006.domain.destination.entity.Destination;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
@Validated
public class CourseController {
//    private final Destination destination;
//    private final CourseMapper courseMapper;
    private final CourseService courseService;

    @PostMapping
    public ResponseEntity postCourse(@Valid @RequestBody CoursePostDto coursePostDto, Authentication authentication){

        String memberEmail = authentication.getPrincipal().toString();


//        List<DestinationPostDto> des = coursePostDto.getDestinations();
//        for(int i=0; i<des.size(); i++){
//
//        }
        Course createdCourse = courseService.createCourse(coursePostDto, memberEmail);

        // 응답 헤더에 리소스 위치 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/courses/" + createdCourse.getCourseId()));

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
}
