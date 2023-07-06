package com.seb_main_006.domain.answer.service;

import com.seb_main_006.domain.answer.dto.AnswerPatchDto;
import com.seb_main_006.domain.answer.dto.AnswerPostDto;
import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.answer.repository.AnswerRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.service.PostService;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    private final MemberService memberService;
    private final PostService postService;
    private final AnswerRepository answerRepository;

    public Answer createAnswer(AnswerPostDto answerPostDto, String memberEmail, Long postId) {

        Member findmember = memberService.findVerifiedMember(memberEmail);
        Post findPost = postService.findVerifiedPost(postId);

        Answer newAnswer = new Answer();
        newAnswer.setAnswerContent(answerPostDto.getAnswerContent());
        newAnswer.setPost(findPost);
        newAnswer.setMember(findmember);

        return answerRepository.save(newAnswer);
    }

    public Answer updateAnswer(AnswerPatchDto answerPatchDto, String memberEmail, Long answerId) {

        Member findMember = memberService.findVerifiedMember(memberEmail);
        Answer findAnswer = findVerifiedAnswer(answerId);

        verifyUser(findMember, findAnswer);

        Optional.ofNullable(answerPatchDto.getAnswerContent()).ifPresent(findAnswer::setAnswerContent);

        return answerRepository.save(findAnswer);
    }

    //AnswerId로 answer찾는 메소드
    private Answer findVerifiedAnswer(Long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    private void verifyUser(Member findMember, Answer findAnswer) {
        if (!findMember.getMemberId().equals(findAnswer.getMember().getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_CANT_UPDATE_DELETE);
        }
    }
}
