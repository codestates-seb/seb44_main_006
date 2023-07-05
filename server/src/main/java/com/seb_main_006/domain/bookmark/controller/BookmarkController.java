package com.seb_main_006.domain.bookmark.controller;

import com.seb_main_006.domain.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
@Validated
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/{courseId}/bookmark")
    public ResponseEntity postLikes(@PathVariable Long courseId, @AuthenticationPrincipal(expression = "username") String memberEmail){
        bookmarkService.clickBookmark(courseId, memberEmail);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
