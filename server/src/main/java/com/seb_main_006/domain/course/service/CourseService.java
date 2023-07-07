package com.seb_main_006.domain.course.service;

import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.mapper.CourseMapper;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.destination.entity.Destination;
import com.seb_main_006.domain.destination.respository.DestinationRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import com.seb_main_006.global.util.DateConverter;
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
    private final CourseMapper courseMapper;

    /**
     * 일정 생성
     */
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
            desPost(i, des, course, desList);
        }

        return courseRepository.save(course);
    }

    /**
     * 일정 조회
     */
    @Transactional(readOnly = true)
    public CoursePostDto findCourse(Long courseId, String memberEmail) {

        Member findmember = memberService.findVerifiedMember(memberEmail);
        Course findCourse = findVerifiedCourse(courseId);
        verifyMyCourse(findmember, findCourse); // 본인의 일정인지 확인

        String dateString = DateConverter.localDateToStringWithDay(findCourse.getCourseDday()); // Dday를 요일 정보 추가한 String 으로 변환

        // Course -> CoursePostDto (응답 데이터 형식)
        CoursePostDto response = courseMapper.courseToCourseDto(findCourse);
        List<DestinationPostDto> destinationPostDtos = courseMapper.destinationsToDestinationDtos(findCourse.getDestinations());
        response.setDestinationList(destinationPostDtos);
        response.getCourseData().setCourseDday(dateString);

        return response;
    }

    /**
     * 일정 수정
     */
    @Transactional
    public Course updateCourse(CoursePostDto coursePostDto, String memberEmail, Long courseId) {

        Member findmember = memberService.findVerifiedMember(memberEmail);
        Course findCourse = findVerifiedCourse(courseId);
        verifyMyCourse(findmember, findCourse);

        //Course 테이블 수정
        Optional.ofNullable(coursePostDto.getCourseData().getCourseDday()).ifPresent(courseDday -> {
            LocalDate date = stringToDateConverter(courseDday);
            findCourse.setCourseDday(date);
        });
        Optional.ofNullable(coursePostDto.getCourseData().getCourseTitle()).ifPresent(findCourse::setCourseTitle);
        Optional.ofNullable(coursePostDto.getCourseData().getCourseContent()).ifPresent(findCourse::setCourseContent);
        Optional.ofNullable(coursePostDto.getCourseData().getCourseThumbnail()).ifPresent(findCourse::setCourseThumbnail);

        List<DestinationPostDto> des = coursePostDto.getDestinationList();
        List<Destination> desList = findCourse.getDestinations();
        desList.clear();
        destinationRepository.deleteAllByCourse(findCourse);

        //Destination 테이블 수정
        for (int i = 0; i < des.size(); i++) {
            desPost(i, des, findCourse, desList);
        }

        findCourse.setCourseUpdatedAt((LocalDateTime.now()));
        return courseRepository.save(findCourse);
    }

    /**
     * 일정 삭제
     */
    @Transactional
    public void deleteCourse(long courseId, String memberEmail) {
        Member findmember = memberService.findVerifiedMember(memberEmail);
        Course findCourse = findVerifiedCourse(courseId);
        verifyMyCourse(findmember, findCourse);

        courseRepository.delete(findCourse);
    }


    // 본인의 일정이 아닐 경우 예외 발생
    public void verifyMyCourse(Member member, Course course) {
        if (member.getMemberId().longValue() != course.getMember().getMemberId().longValue()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_DOES_NOT_MATCH);
        }
    }

    // courseId 로 Course 조회, DB 에 없을 경우 예외 발생
    public Course findVerifiedCourse(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COURSE_NOT_FOUND));
    }

    //Post랑 Patch에서 사용할 목적지 저장 메소드
    private void desPost(int i, List<DestinationPostDto> des, Course course, List<Destination> desList) {
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
}
