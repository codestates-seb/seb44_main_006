package com.seb_main_006.domain.course.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseInfoDto {

    private Long courseId;
    private List<DestinationPostDto> destinationList;
}
