package com.seb_main_006.domain.destination.entity;

import com.seb_main_006.domain.course.entity.Course;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long destinationId; // 목적지 식별자, 기본키

    @Column
    private int placeSequence; // 목적지 장소 순서

    @Column
    private String categoryGroupCode; // 카테고리 그룹 코드

    @Column
    private String categoryGroupName; // 카테고리 그룹 이름

    @Column
    private String id; // 장소 고유 번호

    @Column
    private String placeName; // 장소 이름

    @Column
    private String placeUrl; // 장소 상세보기 URL

    @Column
    private String x; // 경도(동경 136도 -> 세로선)

    @Column
    private String y; // 위도(북위 37도 -> 가로선)

    @Column
    private String roadAddressName; // 장소 도로명 주소

    @Column
    private String phone; // 장소 전화번호

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course; // course entity와 연관관계 매핑(다:1)
}
