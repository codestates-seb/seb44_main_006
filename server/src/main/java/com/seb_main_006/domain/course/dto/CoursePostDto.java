package com.seb_main_006.domain.course.dto;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;


@Data
public class CoursePostDto {

    private LocalDate courseDday;

    private String courseTitle;

    private String courseContent;

    private String courseThumbnail;

    private List<DestinationPostDto> destinations;

}
