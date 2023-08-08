package com.seb_main_006.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PostPostDto {

    private Long courseId;

    private String postContent;

    private List<String> tags;
}
