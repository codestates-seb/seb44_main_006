package com.seb_main_006.domain.tag.entity;

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

    public Tag(String tagName){
        this.tagName = tagName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tag tag = (Tag) o;

        return Objects.equals(tagName, tag.tagName);
    }

    @Override
    public int hashCode() {
        return tagName != null ? tagName.hashCode() : 0;
    }
}

