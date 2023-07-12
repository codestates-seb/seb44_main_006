package com.seb_main_006.domain.post.entity;

import com.seb_main_006.domain.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PostTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postTagId; // 게시글-태그 식별자, 기본키

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post; // post entity와 연관관계 매핑(다:1)

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag; // tag entity와 연관관계 매핑(다:1)

    public PostTag(String tagName) {
        this.tag = new Tag(tagName);
    }
}

