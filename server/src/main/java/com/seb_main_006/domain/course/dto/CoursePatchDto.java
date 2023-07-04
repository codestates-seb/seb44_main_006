package com.seb_main_006.domain.course.dto;

import com.seb_main_006.domain.destination.entity.Destination;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Data
public class CoursePatchDto {

    private Long courseId;

    @NotBlank
    private String courseTitle;

    @NotBlank
    private String courseContent;

    private String courseThumbnail;

    private boolean isPosted;

    private String courseDday;

    private List<DestinationPatchDto> destinations;

}
