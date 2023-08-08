package com.seb_main_006.domain.post.dto;

import lombok.Data;
import org.springframework.data.domain.Page;
import java.util.List;

@Data
public class PostListResponseDto {

    private List<PostDataForList> data;
    private PageInfo pageInfo;

    public PostListResponseDto(List<PostDataForList> data, Page page) {
        this.data = data;

        // Page 객체를 통해 PageInfo 생성
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
