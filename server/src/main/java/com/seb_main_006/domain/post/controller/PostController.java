package com.seb_main_006.domain.post.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.domain.post.dto.PostDetailResponseDto;
import com.seb_main_006.domain.post.dto.PostListResponseDto;
import com.seb_main_006.domain.post.dto.PostPostDto;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Validated
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity postCourse(@Valid @RequestBody PostPostDto postPostDto,
                                     @AuthenticationPrincipal(expression = "username") String memberEmail) {
        //@AuthenticationPrincipal로 현재 저장되어있는 이메일 가져옴 -> customUserDetail이 없어서 @AuthenticationPrincipal를 통해 userDetail 구현한후 객체를 주입함

        Post createdPost = postService.createPost(postPostDto, memberEmail);

        // 응답 헤더에 리소스 위치 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(Long.toString(createdPost.getPostId())));

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/read/{post-id}")
    public ResponseEntity<?> getPost(@PathVariable("post-id") @Positive Long postId,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws JsonProcessingException {
        String accessToken = null;
        String authorization = request.getHeader("Authorization");

        if (authorization != null) {
            accessToken = authorization.replaceAll("Bearer", "");
        }

        viewCountUp(postId, request, response);
        PostDetailResponseDto responseDto = postService.findPost(postId, accessToken);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 게시글 리스트 조회 (+ 태그 검색 시도중)
     */
    @GetMapping("/read")
    public ResponseEntity getPosts(@Positive @RequestParam int page,
                                   @Positive @RequestParam int limit,
                                   @RequestParam(required = false) String sort,
                                   @RequestParam(required = false) String tagName,
                                   HttpServletRequest request) {

        String accessToken = null;
        String authorization = request.getHeader("Authorization");

        if (authorization != null) {
            accessToken = authorization.replaceAll("Bearer ", "");
        }

        PostListResponseDto response = postService.findPosts(page - 1, limit, sort, accessToken, tagName);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/tagged/{tagName}")
    public ResponseEntity getPostListByTag(@PathVariable String tagName,
                                           @RequestParam @Positive Integer page,
                                           @RequestParam @Positive Integer limit,
                                           @RequestParam(required = false) String sort,
                                           HttpServletRequest request) throws JsonProcessingException {

        log.info("page = {}, limit = {}, sort = {}", page, limit, sort);
        String accessToken = null;
        String authorization = request.getHeader("Authorization");

        if (authorization != null) {
            accessToken = authorization.replaceAll("Bearer ", "");
        }

        PostListResponseDto response = postService.getPostListByTag(tagName, page - 1, limit, sort, accessToken);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity deletePost(@PathVariable @Positive Long postId,
                                     @AuthenticationPrincipal(expression = "username") String memberEmail) {

        log.info("memberEmail = {}", memberEmail); // OK

        postService.deletePost(postId, memberEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    private void viewCountUp(Long postId, HttpServletRequest request, HttpServletResponse response) {

        Cookie oldCookie = null;

        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("postView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + postId.toString() + "]")) {
                postService.viewCountUp(postId);
                oldCookie.setValue(oldCookie.getValue() + "_[" + postId.toString() + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                response.addCookie(oldCookie);
            }
        } else {
            log.info("cookie check4");
            postService.viewCountUp(postId);
            Cookie newCookie = new Cookie("postView", "[" + postId + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            response.addCookie(newCookie);
        }

    }
}
