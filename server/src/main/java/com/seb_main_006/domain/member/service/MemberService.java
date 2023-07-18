package com.seb_main_006.domain.member.service;

import com.seb_main_006.domain.bookmark.entity.Bookmark;
import com.seb_main_006.domain.bookmark.repository.BookmarkRepository;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.like.repository.LikesRepository;
import com.seb_main_006.domain.member.dto.*;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.repository.MemberRepository;
import com.seb_main_006.global.auth.utils.CustomAuthorityUtils;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import com.seb_main_006.global.mail.service.MailService;
import com.seb_main_006.global.uploadImg.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final S3Uploader s3Uploader;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final CourseRepository courseRepository;
    private final BookmarkRepository bookmarkRepository;
    private final LikesRepository likesRepository;
    private final MailService mailService;

    /**
     * 소셜 로그인 회원 가입
     */
    public Member createMember(Member member) {

        // 탈퇴한 회원일 경우 기존 탈퇴 상태를 ACTIVE 로 전환
        if (findDeletedMember(member.getMemberEmail()).isPresent()) {
            Member findDeletedMember = findDeletedMember(member.getMemberEmail()).get();
            findDeletedMember.activateMember(member); // 탈퇴한 회원 상태 활성화

            // 템플릿 적용된 메일 비동기로 보내기
            mailService.send(member);
            return memberRepository.save(findDeletedMember);
        }

        // DB에 이메일이 존재하지 않을 때만 회원 가입 로직 수행
        if (!verifyExistEmail(member.getMemberEmail())) {

            member.setRoles(customAuthorityUtils.createRoles(member.getMemberEmail())); // member Role 저장

            // 템플릿 적용된 메일 비동기로 보내기
            mailService.send(member);
            return memberRepository.save(member);
        }

        return findExistMember(member.getMemberEmail()); // DB에 이메일(계정)이 존재하면 DB에 저장된 Member 반환
    }

    /**
     * 마이페이지 조회
     */
    public MyPageResponseDto getMyPage(String memberEmail) {

        // memberEmail로 Member 찾아옴
        Member findMember = findVerifiedMember(memberEmail);

        // 찾아온 Member로 mycourseList와 myBookmarkedList 찾아옴
        List<Course> myCourseList = courseRepository.findAllByMember(findMember);
        List<Bookmark> myBookmarkedList = bookmarkRepository.findAllByMember(findMember);

        // myCourseList를 순회하면서 newMemberCourseList에 값넣음
        List<MemberCourse> newMemberCourseList = new ArrayList<>();
        for(int i=0; i<myCourseList.size(); i++){
            Course findCourse = myCourseList.get(i);
            MemberCourse newMemberCourse = new MemberCourse(findCourse);
            newMemberCourseList.add(newMemberCourse);
        }

        // myBookmarkedList를 순회하면서 newMemberBookmarkedList에 값넣음
        List<MemberBookmarked> newMemberBookmarkedList = new ArrayList<>();
        for(int i=0; i<myBookmarkedList.size(); i++){
            Bookmark findBookmark = myBookmarkedList.get(i);
            boolean likeStatus = likesRepository.findByMemberAndCourse(findMember, findBookmark.getCourse()).isPresent();
            MemberBookmarked newMemberBookmarked = new MemberBookmarked(findBookmark.getCourse(), likeStatus, findBookmark.getBookmarkId());
            newMemberBookmarkedList.add(newMemberBookmarked);
        }

        // 업데이트시간 기준 정렬(최근 업데이트가 빠른 기준 내림차순 정렬)
        newMemberCourseList.sort(Comparator.comparing(MemberCourse::getCourseDday).reversed());
        newMemberBookmarkedList.sort(Comparator.comparing(MemberBookmarked::getBookmarkId).reversed());

        // MypageResponseDto에 값넣고 리턴
        MyPageResponseDto myPageResponseDto = new MyPageResponseDto();
        myPageResponseDto.setMemberCourseList(newMemberCourseList);
        myPageResponseDto.setMemberBookmarkedList(newMemberBookmarkedList);

        return myPageResponseDto;
    }

    /**
     * 회원 정보 수정 (현재 닉네임만 수정)
     */
    public void updateMember(MemberPatchDto memberPatchDto, String memberEmail) {

        Member findMember = findVerifiedMember(memberEmail);
        findMember.setMemberNickname(memberPatchDto.getMemberNickname());
    }

    /**
     * 회원 탈퇴 (상태변경 ACTIVE -> DELETED)
     */
    public void deleteMember(String memberEmail) {
        Member findMember = findVerifiedMember(memberEmail);
        findMember.setMemberStatus(Member.MemberStatus.DELETED);
        findMember.setMemberNickname("탈퇴한 사용자");
    }

    /**
     * 프로밀 이미지 업로드
     */
    public void updateImgMember(String memberEmail, MultipartFile img) throws IOException {
        Member findMember = findVerifiedMember(memberEmail);
        String storedImgUri="";
        if(!img.isEmpty()) {
            s3Uploader.getModifyImageURL(img, findMember);
            storedImgUri = s3Uploader.upload(img,"images", findMember);
        }
       findMember.setMemberImageUrl(storedImgUri);
    }

    // 이메일로 DB에서 회원을 조회하고, 현재 가입된 provider 정보 String으로 반환 (GOOGLE, NAVER, KAKAO, null)
    public String findExistEmailAndDiffProvider(String userEmail, String currentProvider) {

        Optional<Member> optionalMember = memberRepository.findByMemberEmail(userEmail);

        // DB에 이메일(가입된 계정)이 존재하고, 그 계정의 provider가 현재 로그인하려는 provider와 같을 경우에는 null 로 반환
        // handler에서 예외 처리 로직을 타지 않도록 하기 위함
        if (optionalMember.isPresent() && optionalMember.get().getMemberProvider().toString().equalsIgnoreCase(currentProvider)) {
            return null;
        }
        return optionalMember.map(member -> member.getMemberProvider().toString()).orElse(null);
    }

    // DB에 이메일(계정) 존재 여부 Boolean 타입으로 반환
    private boolean verifyExistEmail(String userEmail) {

        Optional<Member> user = memberRepository.findByMemberEmail(userEmail);
        return user.isPresent();
    }

    // DB에서 회원 조회 (해당 email을 가진 회원이 없을 경우 예외X -> null 반환)
    public Member findExistMember(String userEmail) {

        Optional<Member> optionalMember = memberRepository.findByMemberEmail(userEmail);
        return optionalMember.orElse(null);
    }

    // DB에서 회원 조회 (해당 email을 가진 회원이 없을 경우 예외)
    public Member findVerifiedMember(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 탈퇴한 회원의 재가입인지 확인 -> 탈퇴상태 회원 리턴
    private Optional<Member> findDeletedMember(String memberEmail) {
        return memberRepository.findDeletedUserByMemberEmail(memberEmail);
    }
}
