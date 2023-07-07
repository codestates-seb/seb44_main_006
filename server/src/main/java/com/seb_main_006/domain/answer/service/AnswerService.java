package com.seb_main_006.domain.answer.service;

import com.seb_main_006.domain.answer.dto.AnswerPatchDto;
import com.seb_main_006.domain.answer.dto.AnswerPostDto;
import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.answer.repository.AnswerRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.repository.PostRepository;
import com.seb_main_006.domain.post.service.PostService;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    private final MemberService memberService;
    private final PostService postService;
    private final AnswerRepository answerRepository;
    private final PostRepository postRepository;

    // 댓글 생성
    public Answer createAnswer(AnswerPostDto answerPostDto, String memberEmail, Long postId) {

        // 현재 로그인한 Member와 댓글을 달 Post를 가져옴
        Member findmember = memberService.findVerifiedMember(memberEmail);
        Post findPost = postService.findVerifiedPost(postId);

        // Answer 생성해서 값 넣고 저장
        Answer newAnswer = new Answer();
        newAnswer.setAnswerContent(answerPostDto.getAnswerContent());
        newAnswer.setPost(findPost);
        newAnswer.setMember(findmember);

        return answerRepository.save(newAnswer);
    }

    // 댓글 수정
    public Answer updateAnswer(AnswerPatchDto answerPatchDto, String memberEmail, Long answerId) {

        // 현재 로그인한 Member와 수정할 Answer를 가져옴
        Member findMember = memberService.findVerifiedMember(memberEmail);
        Answer findAnswer = findVerifiedAnswer(answerId);

        // 로그인한 작성자와 answer 작성자가 동일한지 확인
        verifyUser(findMember, findAnswer);

        // 이후 변경사항 저장
        Optional.ofNullable(answerPatchDto.getAnswerContent()).ifPresent(findAnswer::setAnswerContent);

        return answerRepository.save(findAnswer);
    }

    // 댓글 삭제
    public void deleteAnswer(String memberEmail, Long answerId) {

        // 현재 로그인한 Member와 삭제할 Answer를 가져옴
        Member findMember = memberService.findVerifiedMember(memberEmail);
        Answer findAnswer = findVerifiedAnswer(answerId);

        // 멤버 권한 체크
        List<String> findRole = findMember.getRoles();

        // ADMIN 권한이 없을 경우에만 본인 일정 여부 검증
        if (!findRole.contains("ADMIN")) {
            // 로그인한 작성자와 answer 작성자가 동일한지 확인
            verifyUser(findMember, findAnswer);
        }

        // 동일할 경우 삭제
        answerRepository.delete(findAnswer);
    }

    // AnswerId로 answer찾는 메소드
    private Answer findVerifiedAnswer(Long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    // 로그인한 사용자와 answer의 작성자가 동일한지 확인하는 메소드
    private void verifyUser(Member findMember, Answer findAnswer) {
        if (!findMember.getMemberId().equals(findAnswer.getMember().getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_CANT_UPDATE_DELETE);
        }
    }
}
