package com.seb_main_006.domain.post.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seb_main_006.domain.answer.dto.AnswerResponseDto;
import com.seb_main_006.domain.course.dto.CourseInfoDto;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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


    public Post createPost(PostPostDto postPostDto, String memberEmail) {

        Member findmember = memberService.findVerifiedMember(memberEmail);
        Course findcourse = courseService.findVerifiedCourse(postPostDto.getCourseId());

        courseService.verifyMyCourse(findmember, findcourse); //코스 작성자와 현재 로그인한 작성자가 동일한지 확인

        verifyExistCourse(findcourse); //작성한 코스가 있으면 예외처리

        Post post = new Post(); //새로 저장할 Post 선언

        post.setPostContent(postPostDto.getCourseContent()); //저장할 post에 게시글내용과 코스 저장

        post.setCourse(findcourse); //Post에 코스 저장(연관관계 매핑)

        List<String> inputTags = postPostDto.getTags(); //입력받은 태그 리스트를 postPostDto에서 꺼내옴

        //입력받은 태그 리스트의 길이만큼 반복
        for (int i = 0; i < inputTags.size(); i++) {

            String tagName = inputTags.get(i); //입력받은 태그 이름 인덱스로 꺼내옴

            PostTag newPostTag = new PostTag(); //저장할 새로운 PostTag선언

            Optional<Tag> optionalTag = tagRepository.findByTagName(tagName); //Tag테이블에서 tagName으로 값이 존재하는 지 확인

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

        //포스팅 여부 처리
        boolean posted = findcourse.isPosted();
        findcourse.setPosted(!posted);
        courseRepository.save(findcourse);

        //Post 테이블에 저장
        return postRepository.save(post);
    }

    /**
     * 게시글 상세 조회
     */
    @Transactional
    public PostDetailResponseDto findPost(Long postId, String accessToken) throws JsonProcessingException {

        Member member = new Member();

        if (accessToken != null) {
            String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
            member = memberService.findVerifiedMember(memberEmail);
        }

        Post findPost = findVerifiedPost(postId);
        Course course = updateCourseViewCount(findPost.getCourse());
        List<String> tags = findPost.getPostTagsInPost().stream()
                .map(postTag -> postTag.getTag().getTagName())
                .collect(Collectors.toList());
        PostDetailResponseDto response = postMapper.postToPostDetailResponseDto(findPost);
        CourseInfoDto courseInfoDto = new CourseInfoDto();
        courseInfoDto.setCourseId(course.getCourseId());

        boolean likeStatus = likesRepository.findByMemberAndCourse(member, course).isPresent();
        boolean bookmarkStatus = bookmarkRepository.findByMemberAndCourse(member, course).isPresent();

        List<DestinationPostDto> destinationPostDtos = postMapper.destinationsToDestinationDtos(course.getDestinations());
        courseInfoDto.setDestinationList(destinationPostDtos);
        List<AnswerResponseDto> answerResponseDtos = postMapper.answersToAnswerDtos(findPost.getAnswersInPost());

        response.setAnswerList(answerResponseDtos);
        response.setCourseInfo(courseInfoDto);
        response.setTags(tags);
        response.setLikeStatus(likeStatus);
        response.setBookmarkStatus(bookmarkStatus);

        return response;
    }

    public PostListResponseDto findPosts(int page, int limit, String sort, String accessToken) throws JsonProcessingException {

        Member member = new Member(0L);

        if (accessToken != null) {
            String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
            member = memberService.findVerifiedMember(memberEmail);
        }
        System.out.println(0);
        Page<Course> pageResult = courseRepository.findAllByPosted(true, PageRequest.of(page, limit ,Sort.by(sort == null ? "courseUpdatedAt" : "courseLikeCount")));
        List<PostDataForList> postDataList = new ArrayList<>();
        System.out.println(1);
        for (Course course : pageResult.getContent()) {
            boolean likeStatus = likesRepository.findByMemberAndCourse(member, course).isPresent();  System.out.println(2);
            boolean bookmarkStatus = bookmarkRepository.findByMemberAndCourse(member, course).isPresent();   System.out.println(3);
            PostDataForList postData = PostDataForList.of(course, likeStatus, bookmarkStatus);   System.out.println(4);
            postDataList.add(postData);  System.out.println(5);
        }
        System.out.println(6);

        System.out.println(7);
        return new PostListResponseDto(postDataList, pageResult);
    }

    /**
     * 태그로 게시글 조회
     */
    public PostListResponseDto getPostListByTag(String tagName, int page, int limit, String sort, String accessToken) throws JsonProcessingException {

        Member member = new Member(0L);
        PageRequest pageRequest = PageRequest.of(page, limit);

        if (accessToken != null) {
            String memberEmail = jwtTokenizer.getSubject(accessToken).getUsername();
            member = memberService.findVerifiedMember(memberEmail);
        }

        // tagName 으로 tag 찾은 후, 해당 태그들을 가진 Course Page로 조회
        List<Tag> findTagList = tagRepository.findByTagNameContaining(tagName);
        Page<Course> pageResult = postTagRepository.findByTagIn(findTagList, pageRequest);

        // 응답 데이터 형식으로 변환해서 리턴 (없는 데이터 : likeStatus, bookmarkStatus < 이부분 때문에 쿼리가 많이 날라감...)
        List<PostDataForList> postDataList = new ArrayList<>();

        for (Course course : pageResult.getContent()) {
            boolean likeStatus = likesRepository.findByMemberAndCourse(member, course).isPresent();
            boolean bookmarkStatus = bookmarkRepository.findByMemberAndCourse(member, course).isPresent();
            PostDataForList postData = PostDataForList.of(course, likeStatus, bookmarkStatus);
            postDataList.add(postData);
        }

        // 정렬 조건에 따라 정렬
        if (sort == null) {
            postDataList = postDataList.stream().sorted(Comparator.comparing(PostDataForList::getCourseUpdatedAt).reversed()).collect(Collectors.toList());
        } else {
            postDataList = postDataList.stream().sorted(Comparator.comparing(PostDataForList::getCourseLikeCount).reversed()).collect(Collectors.toList());
        }

        return new PostListResponseDto(postDataList, pageResult);
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deletePost(Long postId, String memberEmail) {
        Post findPost = findVerifiedPost(postId);
        Member findMember = memberService.findVerifiedMember(memberEmail);
        Course course = findPost.getCourse();

        courseService.verifyMyCourse(findMember, course);
        course.removePost();
        postRepository.delete(findPost);
    }


    public void verifyNoExistPost(Course course) {
        postRepository.findByCourse(course).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CANT_LIKE_NOT_FOUND));
    }



    //해당 코스로 작성된 게시글이 있는지 확인하는 메소드
    private void verifyExistCourse(Course course) {
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
    public Course updateCourseViewCount(Course findCourse) {

        long courseCount = findCourse.getCourseViewCount();
        findCourse.setCourseViewCount(courseCount + 1);
        return courseRepository.save(findCourse);
    }

    //코스로 작성된 게시글이 있으면 그 게시글 리턴 없으면 예외
    public Post findVerifiedPost(Course course) {
        return postRepository.findByCourse(course)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

}
