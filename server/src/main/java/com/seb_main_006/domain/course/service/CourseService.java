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
import java.util.List;
import static com.seb_main_006.global.util.DateConverter.stringToDateConverter;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final DestinationRepository destinationRepository;
    private final MemberService memberService;
    private final CourseMapper courseMapper;

    @Transactional
    public Course createCourse(CoursePostDto coursePostDto, String memberEmail){

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
        List desList = course.getDestinations();

        for(int i=0; i<des.size(); i++){
            Destination newDes = new Destination();
            newDes.setPlaceSequence(i+1);
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

    @Transactional(readOnly = true)
    public CoursePostDto findCourse(Long courseId, String memberEmail) {

        Member findmember = memberService.findVerifiedMember(memberEmail);
        Course findCourse = findVerifiedcourse(courseId);
        verifyMyCourse(findmember, findCourse); // 본인의 일정인지 확인

        String dateString = DateConverter.LocalDateToStringWithDay(findCourse.getCourseDday()); // Dday를 요일 정보 추가한 String 으로 변환

        // Course -> CoursePostDto (응답 데이터 형식)
        CoursePostDto response = courseMapper.courseToCourseDto(findCourse);
        List<DestinationPostDto> destinationPostDtos = courseMapper.destinationsToDestinationDtos(findCourse.getDestinations());
        response.setDestinationList(destinationPostDtos);
        response.getCourseData().setCourseDday(dateString);

        return response;
    }



    // 본인의 일정이 아닐 경우 예외 발생
    private void verifyMyCourse(Member member, Course course) {
        if (member.getMemberId().longValue() != course.getMember().getMemberId().longValue()) {
            throw new BusinessLogicException(ExceptionCode.COURSE_CANNOT_READ);
        }
    }

    // courseId 로 Course 조회, DB 에 없을 경우 예외 발생
    public Course findVerifiedcourse(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COURSE_NOT_FOUND));
    }
}
