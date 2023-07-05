package com.seb_main_006.domain.like.controller;

import com.seb_main_006.domain.like.service.LikesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@Slf4j
@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
@Validated
public class LikesController {

    private final LikesService likesService;

    @PostMapping("/{courseId}/like")
    public ResponseEntity postLikes(@PathVariable Long courseId, @AuthenticationPrincipal(expression = "username") String memberEmail){
        likesService.clickLikes(courseId, memberEmail);

        // 응답 헤더에 리소스 위치 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/courses/" + courseId));

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
}
