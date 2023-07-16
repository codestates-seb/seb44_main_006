package com.seb_main_006.domain.post.service;

import com.seb_main_006.domain.course.dto.CourseInfoDto;
import com.seb_main_006.domain.bookmark.repository.BookmarkRepository;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.course.service.CourseService;
import com.seb_main_006.domain.like.repository.LikesRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.domain.post.dto.PostDetailResponseDto;
import com.seb_main_006.domain.post.dto.PostDataForList;
import com.seb_main_006.domain.post.dto.PostListResponseDto;
import com.seb_main_006.domain.post.dto.PostPostDto;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.entity.PostTag;
import com.seb_main_006.domain.post.mapper.PostMapper;
import com.seb_main_006.domain.post.repository.PostRepository;
import com.seb_main_006.domain.post.repository.PostTagRepository;
import com.seb_main_006.domain.tag.entity.Tag;
import com.seb_main_006.domain.tag.repository.TagRepository;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final MemberService memberService;
    private final CourseService courseService;
    private final TagRepository tagRepository;
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final CourseRepository courseRepository;
    private final PostTagRepository postTagRepository;
    private final LikesRepository likesRepository;
    private final BookmarkRepository bookmarkRepository;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 게시글 생성
     */
    public Post createPost(PostPostDto postPostDto, String memberEmail) {

        Member findmember = memberService.findVerifiedMember(memberEmail);
        Course findcourse = courseService.findVerifiedCourse(postPostDto.getCourseId());

        log.info("게시글 생성 시작 findcourse.getCourseId={}, findmember.getMemberEmail={}", findcourse.getCourseId(), findmember.getMemberEmail());

        courseService.verifyNotMyCourse(findmember, findcourse); // 코스 작성자와 현재 로그인한 작성자가 동일한지 확인
        verifyExistCourse(findcourse); // 작성한 코스가 있으면 예외처리

        Post post = new Post(); // 새로 저장할 Post 선언
        post.setPostContent(postPostDto.getPostContent()); // 저장할 post에 게시글내용과 코스 저장
        post.addCourse(findcourse); // Post에 코스 저장(연관관계 매핑)

        List<String> inputTags = postPostDto.getTags(); // 입력받은 태그 리스트를 postPostDto에서 꺼내옴

        // 입력받은 태그 리스트의 길이만큼 반복
        for (int i = 0; i < inputTags.size(); i++) {
            log.info("게시글 생성시 태그 for문 시작!!!");
            String tagName = inputTags.get(i); // 입력받은 태그 이름 인덱스로 꺼내옴

            PostTag newPostTag = new PostTag(); // 저장할 새로운 PostTag선언

            Optional<Tag> optionalTag = tagRepository.findByTagName(tagName); // Tag테이블에서 tagName으로 값이 존재하는 지 확인

            // 존재할 경우 newPostTag에 가져온 tag 저장
            if (optionalTag.isPresent()) {
                Tag findTag = optionalTag.get();
                newPostTag.setTag(findTag);
            }
            // 존재하지 않을 경우 tag테이블에 저장 후 newPostTag에 저장
            else {
                newPostTag.setTag(tagRepository.save(new Tag(tagName)));
            }

            newPostTag.setPost(post); // new PostTag에 Post세팅(연관관계 매핑)
            post.getPostTagsInPost().add(newPostTag);// post의 PostTagsInpost리스트에 newPostTag 추가(연관관계 매핑)
        }

        // 포스팅 여부 처리
        findcourse.setPosted(true);
        courseRepository.save(findcourse);

        log.info("게시글 생성 종료전 post.getCourse.getCourseId={}", post.getCourse().getCourseId());

        // Post 테이블에 저장
        return postRepository.save(post);
    }

    /**
     * 게시글 상세 조회
     */
    @Transactional
    public PostDetailResponseDto findPost(Long postId, String accessToken) {

        Member member = new Member(0L);

        // 토큰 관련 예외 모두 통과시키기
        if (accessToken != null && !accessToken.equals("")) {
            try {
                String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
                member = memberService.findVerifiedMember(memberEmail);
            } catch (Exception e) {}
        }

        Post findPost = findVerifiedPost(postId);
        Course course = findPost.getCourse();

        PostDetailResponseDto response = postMapper.postToPostDetailResponseDto(findPost); // response 1차 매핑

        // response에 나머지 값 세팅 (tags, courseInfo, answerDtoList, likeStatus, bookmarkStatus)
        List<String> tags = findPost.getPostTagsInPost().stream()
                .map(postTag -> postTag.getTag().getTagName())
                .collect(Collectors.toList());

        response.setAnswerList(postMapper.answersToAnswerDtos(findPost.getAnswersInPost()));
        response.setCourseInfo(new CourseInfoDto(course.getCourseId(), postMapper.destinationsToDestinationDtos(course.getDestinations())));
        response.setTags(tags);
        response.setLikeStatus(likesRepository.findByMemberAndCourse(member, course).isPresent());
        response.setBookmarkStatus(bookmarkRepository.findByMemberAndCourse(member, course).isPresent());

        return response;
    }

    /**
     * 게시글 리스트 조회 (+ 태그 검색)
     */
    public PostListResponseDto findPosts(int page, int limit, String sort, String accessToken, String tagName) {

        Member member = new Member(0L);

        if (tagName != null && tagName.isBlank()) {
            tagName = null;
        }

        // 토큰 관련 예외 모두 통과시키기
        if (accessToken != null && !accessToken.equals("")) {
            try {
                String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
                member = memberService.findVerifiedMember(memberEmail);
            } catch (Exception e) {}
        }

        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Course> pageResult = null;

        if (tagName == null) {

            // sort 값 여부에 따라 다른 메서드(정렬기준) 적용
            if (sort == null) {
                pageResult = courseRepository.findAllByPostedOrderByUpdatedAt(pageRequest);
            } else {
                pageResult = courseRepository.findAllByPostedOrderByLikeCount(pageRequest);
            }
        } else {
            // 입력받은 태그 String 을 공백 기준으로 분리
            String[] inputTags = tagName.split(" ");

            // 각각의 tagName 으로 tag 찾은 후, 찾은 태그들을 Set으로 통합 (중복 제거)
            Set<Tag> findTagSet = new HashSet<>();
            Arrays.stream(inputTags)
                    .forEach(inputTag -> findTagSet.addAll(tagRepository.findByTagNameContaining(inputTag)));

            // sort 값 여부에 따라 다른 메서드(정렬기준) 적용
            if (sort == null) {
                pageResult = postTagRepository.findByTagInOrderByUpdatedAt(new ArrayList<>(findTagSet), pageRequest);
            } else {
                pageResult = postTagRepository.findByTagInOrderByLikeCount(new ArrayList<>(findTagSet), pageRequest);
            }
        }

        // 응답 데이터 형식으로 변환해서 리턴 (없는 데이터 : likeStatus, bookmarkStatus)
        List<PostDataForList> postDataList = new ArrayList<>();

        for (Course course : pageResult.getContent()) {
            boolean likeStatus = likesRepository.findByMemberAndCourse(member, course).isPresent();
            boolean bookmarkStatus = bookmarkRepository.findByMemberAndCourse(member, course).isPresent();
            postDataList.add(PostDataForList.of(course, likeStatus, bookmarkStatus));
        }

        return new PostListResponseDto(postDataList, pageResult);
    }

//    /**
//     * 태그로 게시글 (미사용)
//     */
//    public PostListResponseDto getPostListByTag(String tagName, int page, int limit, String sort, String accessToken) {
//        Member member = new Member(0L);
//        PageRequest pageRequest = PageRequest.of(page, limit);
//
//        // 토큰 관련 예외 모두 통과시키기
//        if (accessToken != null && !accessToken.equals("")) {
//            String memberEmail = "";
//            try {
//                memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
//                member = memberService.findVerifiedMember(memberEmail);
//            }
//            catch (Exception e){}
//        }
//
//        // tagName 으로 tag 찾은 후, 해당 태그들을 가진 Course Page로 조회
//        List<Tag> findTagList = tagRepository.findByTagNameContaining(tagName);
//
//        // sort 값 여부에 따라 다른 메서드(정렬기준) 적용
//        Page<Course> pageResult = null;
//        if (sort == null) {
//            pageResult = postTagRepository.findByTagInOrderByUpdatedAt(findTagList, pageRequest);
//        } else {
//            pageResult = postTagRepository.findByTagInOrderByLikeCount(findTagList, pageRequest);
//        }
//
//        // 응답 데이터 형식으로 변환해서 리턴 (없는 데이터 : likeStatus, bookmarkStatus)
//        List<PostDataForList> postDataList = new ArrayList<>();
//
//        for (Course course : pageResult.getContent()) {
//            boolean likeStatus = likesRepository.findByMemberAndCourse(member, course).isPresent();
//            boolean bookmarkStatus = bookmarkRepository.findByMemberAndCourse(member, course).isPresent();
//            PostDataForList dataForList = PostDataForList.of(course, likeStatus, bookmarkStatus);
//            postDataList.add(dataForList);
//        }
//
//        return new PostListResponseDto(postDataList, pageResult);
//    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deletePost(Long postId, String memberEmail) {
        log.info("게시글 삭제 시작 postId={}, memberEmail={}", postId, memberEmail);
        Post findPost = findVerifiedPost(postId);
        Member findMember = memberService.findVerifiedMember(memberEmail);
        Course course = findPost.getCourse();

        // ADMIN 권한이 없을 경우에만 본인 일정 여부 검증
        List<String> findRole = findMember.getRoles();
        if (!findRole.contains("ADMIN")) {
            courseService.verifyNotMyCourse(findMember, course);
        }

        // course 에서의 post, likes, bookmarks 에 대한 연관관계 제거, isPosted 상태 업데이트
        course.removePost();

        likesRepository.deleteAllByCourse(course);
        bookmarkRepository.deleteAllByCourse(course);
        postRepository.delete(findPost);

    }

    // 해당 코스로 작성된 게시글이 있는지 확인하는 메소드
    public void verifyExistCourse(Course course) {
        if (postRepository.findByCourse(course).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.POST_EXISTS);
        }
    }

    // 게시글 존재여부 확인 : 존재하면 게시글 리턴, 없으면 예외
    public Post findVerifiedPost(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    // 조회수 + 1 업데이트
    @Transactional
    public void viewCountUp(Long postId) {
        Post post = findVerifiedPost(postId);
        post.getCourse().setCourseViewCount(post.getCourse().getCourseViewCount() + 1);
    }
}
