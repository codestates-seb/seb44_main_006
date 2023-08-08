package com.seb_main_006.domain.bookmark.service;

import com.seb_main_006.domain.bookmark.entity.Bookmark;
import com.seb_main_006.domain.bookmark.repository.BookmarkRepository;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.course.service.CourseService;
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
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final CourseRepository courseRepository;
    private final MemberService memberService;
    private final CourseService courseService;

    public void clickBookmark(Long courseId, String memberEmail) {

        Member findMember = memberService.findVerifiedMember(memberEmail);
        Course findCourse = courseService.findVerifiedCourse(courseId);

        // 생성된 게시글이 없을 시 예외처리
        if(!findCourse.isPosted()){
            throw new BusinessLogicException(ExceptionCode.CANT_BOOKMARK_NOT_FOUND);
        }
        Optional<Bookmark> findBookmarks = bookmarkRepository.findByMemberAndCourse(findMember, findCourse);

        // 현재 로그인한 멤버의 멤버id와 일정 생성한 멤버id가 동일하면 예외 발생
        courseService.verifyMyCourse(findMember, findCourse);

        Bookmark newBookmark = new Bookmark();

        // 이미 즐겨찾기 누른상태(Likes테이블에 courseId로 검색한 결과가 있을경우)
        if(findBookmarks.isPresent()){
            bookmarkRepository.delete(findBookmarks.get());// Likes 테이블에서 삭제;
        }
        else {
            // 좋아요 안누른상태이면 Likes테이블에 저장
            newBookmark.setCourse(findCourse);
            newBookmark.setMember(findMember);
            newBookmark.setPostId(findCourse.getPost().getPostId());

            findCourse.getBookmarksInCourse().add(newBookmark);

            courseRepository.save(findCourse);
        }
    }

    public int getBookmarkCount(Member member) {
        return bookmarkRepository.countBookmarksByMember(member);
    }
}
