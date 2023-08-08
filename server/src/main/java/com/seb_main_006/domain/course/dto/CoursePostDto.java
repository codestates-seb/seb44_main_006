package com.seb_main_006.domain.course.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
public class CoursePostDto {

    private CourseData courseData;

    private List<DestinationPostDto> destinationList;

}
