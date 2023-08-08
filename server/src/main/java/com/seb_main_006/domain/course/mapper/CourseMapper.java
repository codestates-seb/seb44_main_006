package com.seb_main_006.domain.course.mapper;

import com.seb_main_006.domain.course.dto.CourseData;
import com.seb_main_006.domain.course.dto.CoursePostDto;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.destination.entity.Destination;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CourseMapper {

    DestinationPostDto destinationToDestinationDto(Destination destination);

    List<DestinationPostDto> destinationsToDestinationDtos(List<Destination> destinationList);

    @Mapping(source = "courseDday", target = "courseData.courseDday")
    @Mapping(source = "courseTitle", target = "courseData.courseTitle")
    @Mapping(source = "courseContent", target = "courseData.courseContent")
    @Mapping(source = "courseThumbnail", target = "courseData.courseThumbnail")
    CoursePostDto courseToCourseDto(Course course);
}
