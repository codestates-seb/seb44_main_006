package com.seb_main_006.domain.course.service;

import com.seb_main_006.domain.course.dto.CoursePatchDto;
import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.dto.DestinationPatchDto;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.destination.entity.Destination;
import com.seb_main_006.domain.destination.respository.DestinationRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.seb_main_006.global.util.DateConverter.stringToDateConverter;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final DestinationRepository destinationRepository;
    private final MemberService memberService;

    @Transactional
    public Course createCourse(CoursePostDto coursePostDto, String memberEmail) {

        Member findmember = memberService.findVerifiedMember(memberEmail);

        Course course = new Course();

        course.setMember(findmember);

        //String -> LocalDate 타입변경
        String time = coursePostDto.getCourseData().getCourseDday();
        LocalDate date = stringToDateConverter(time);

        //Course 테이블에 저장
        course.setCourseDday(date);
        course.setCourseTitle(coursePostDto.getCourseData().getCourseTitle());
        course.setCourseContent(coursePostDto.getCourseData().getCourseContent());
        course.setCourseThumbnail(coursePostDto.getCourseData().getCourseThumbnail());

        //Destination 테이블에 저장 할 리스트
        List<DestinationPostDto> des = coursePostDto.getDestinationList();
        List<Destination> desList = course.getDestinations();

        for (int i = 0; i < des.size(); i++) {
            Destination newDes = new Destination();
            newDes.setPlaceSequence(i + 1);
            newDes.setCategoryGroupCode(des.get(i).getCategoryGroupCode());
            newDes.setCategoryGroupName(des.get(i).getCategoryGroupName());
            newDes.setId(des.get(i).getId());
            newDes.setPlaceName(des.get(i).getPlaceName());
            newDes.setPlaceUrl(des.get(i).getPlaceUrl());
            newDes.setX(des.get(i).getX());
            newDes.setY(des.get(i).getY());
            newDes.setRoadAddressName((des.get(i).getRoadAddressName()));
            newDes.setPhone((des.get(i).getPhone()));
            newDes.setCourse(course);
            desList.add(newDes);
        }

        return courseRepository.save(course);
    }


    @Transactional
    public Course updateCourse(CoursePatchDto coursePatchDto, String memberEmail) {

        Course findCourse = findVerifiedCourse(coursePatchDto.getCourseId());
        verifyMember(memberEmail, findCourse);

        //Course 테이블 수정
        Optional.ofNullable(coursePatchDto.getCourseData().getCourseDday()).ifPresent(courseDday -> {
            LocalDate date = stringToDateConverter(courseDday);
            findCourse.setCourseDday(date);
        });
        Optional.ofNullable(coursePatchDto.getCourseData().getCourseTitle()).ifPresent(findCourse::setCourseTitle);
        Optional.ofNullable(coursePatchDto.getCourseData().getCourseContent()).ifPresent(findCourse::setCourseContent);
        Optional.ofNullable(coursePatchDto.getCourseData().getCourseThumbnail()).ifPresent(findCourse::setCourseThumbnail);

        List<DestinationPatchDto> des = coursePatchDto.getDestinationList();
        List<Destination> desList = findCourse.getDestinations();
        desList.clear();
        destinationRepository.deleteAllByCourse(findCourse);

        //Destination 테이블 수정
        for (int i = 0; i < des.size(); i++) {
            Destination updateDes = new Destination();
            updateDes.setPlaceSequence(i + 1);
            updateDes.setCategoryGroupCode(des.get(i).getCategoryGroupCode());
            updateDes.setCategoryGroupName(des.get(i).getCategoryGroupName());
            updateDes.setId(des.get(i).getId());
            updateDes.setPlaceName(des.get(i).getPlaceName());
            updateDes.setPlaceUrl(des.get(i).getPlaceUrl());
            updateDes.setX(des.get(i).getX());
            updateDes.setY(des.get(i).getY());
            updateDes.setRoadAddressName((des.get(i).getRoadAddressName()));
            updateDes.setPhone((des.get(i).getPhone()));
            updateDes.setCourse(findCourse);
            desList.add(updateDes);
        }

        findCourse.setCourseUpdatedAt((LocalDateTime.now()));
        return courseRepository.save(findCourse);
    }

    private void verifyMember(String memberEmail, Course findCourse) {
        if (!findCourse.getMember().getMemberEmail().equals(memberEmail)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_DOES_NOT_MATCH);
        }
    }

    public Course findVerifiedCourse(Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);

        return course.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COURSE_NOT_FOUND));
    }

    //일정 삭제
    @Transactional
    public void deleteCourse(long courseId, String memberEmail) {
        Course findCourse = findVerifiedCourse(courseId);
        verifyMember(memberEmail, findCourse);

        courseRepository.delete(findCourse);
    }

}
