package com.seb_main_006.domain.tag.entity;

import com.seb_main_006.domain.post.entity.PostTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId; // 태그 식별자, 기본키

    @Column(columnDefinition = "TEXT")
    private String tagName; // 태그 이름

    @OneToMany(mappedBy = "tag")
    private List<PostTag> postTagsInTag = new ArrayList<>(); // postTag entity와 연관관계 매핑(1:다)

}

