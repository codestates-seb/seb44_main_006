package com.seb_main_006.domain.like.service;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.course.service.CourseService;
import com.seb_main_006.domain.like.entity.Likes;
import com.seb_main_006.domain.like.repository.LikesRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikesService {

    private final LikesRepository likesRepository;
    private final CourseRepository courseRepository;
    private final MemberService memberService;
    private final CourseService courseService;

    public void clickLikes(Long courseId, String memberEmail) {

        Member findMember = memberService.findVerifiedMember(memberEmail);
        Course findCourse = courseService.findVerifiedCourse(courseId);

        // 생성된 게시글이 없을 시 예외처리
        if(!findCourse.isPosted()){
            throw new BusinessLogicException(ExceptionCode.CANT_LIKE_NOT_FOUND);
        }
        Optional<Likes> findLikes = likesRepository.findLikesByCourse(findCourse);

        // 현재 로그인한 멤버의 멤버id
        Long findMemberId = findMember.getMemberId();

        // 코스를 등록한 사람의 멤버id
        Long courseMemberId = findCourse.getMember().getMemberId();

        // 본인 글에는 좋아요 불가능
        if(findMemberId == courseMemberId){
            throw new BusinessLogicException(ExceptionCode.CANT_LIKE);
        }

        Long findCourseLikeCount = findCourse.getCourseLikeCount();
        Likes newlikes = new Likes();

        // 이미 좋아요 누른상태(Likes테이블에 courseId로 검색한 결과가 있을경우)
        if(findLikes.isPresent()){
            likesRepository.delete(findLikes.get());// Likes 테이블에서 삭제;
            findCourse.setCourseLikeCount(findCourseLikeCount-1);
            courseRepository.save(findCourse);
        }
        else {
            // 좋아요 안누른상태이면 Likes테이블에 저장
            newlikes.setCourse(findCourse);
            newlikes.setMember(findMember);
            newlikes.setPostId(findCourse.getPost().getPostId());

            findCourse.getLikesInCourse().add(newlikes);

            // Course테이블의 좋아요수 +1
            findCourse.setCourseLikeCount(findCourseLikeCount+1);
            courseRepository.save(findCourse);
        }
    }
}
