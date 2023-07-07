package com.seb_main_006.domain.answer.controller;

import com.seb_main_006.domain.answer.dto.AnswerPatchDto;
import com.seb_main_006.domain.answer.dto.AnswerPostDto;
import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.answer.repository.AnswerRepository;
import com.seb_main_006.domain.answer.service.AnswerService;
import com.seb_main_006.domain.post.entity.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
@Validated
public class AnswerController {

    private final AnswerService answerService;

    // 댓글 생성
    @PostMapping("/{post-id}")
    public ResponseEntity postAnswer(@PathVariable("post-id") @Positive Long postId, @Valid @RequestBody AnswerPostDto answerPostDto,
                                     @AuthenticationPrincipal(expression = "username") String memberEmail){

        Answer createdAnswer = answerService.createAnswer(answerPostDto, memberEmail, postId);

        // 응답 헤더에 리소스 위치 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(Long.toString(postId)));

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    // 댓글 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive Long answerId, @Valid @RequestBody AnswerPatchDto answerPatchDto,
                                     @AuthenticationPrincipal(expression = "username") String memberEmail){

        Answer updateAnswer = answerService.updateAnswer(answerPatchDto, memberEmail, answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 댓글 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                       @AuthenticationPrincipal(expression = "username") String memberEmail){
        answerService.deleteAnswer(memberEmail, answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
