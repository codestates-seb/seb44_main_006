package com.seb_main_006.domain.course.service;

import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.destination.entity.Destination;
import com.seb_main_006.domain.destination.respository.DestinationRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
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
}
