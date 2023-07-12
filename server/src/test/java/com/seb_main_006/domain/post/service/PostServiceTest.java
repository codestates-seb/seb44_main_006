package com.seb_main_006.domain.post.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_006.domain.bookmark.repository.BookmarkRepository;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.course.service.CourseService;
import com.seb_main_006.domain.like.repository.LikesRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.entity.PostTag;
import com.seb_main_006.domain.post.mapper.PostMapper;
import com.seb_main_006.domain.post.repository.PostRepository;
import com.seb_main_006.domain.post.repository.PostTagRepository;
import com.seb_main_006.domain.tag.repository.TagRepository;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @InjectMocks
    private PostService postService;

    @Mock private MemberService memberService;
    @Mock private CourseService courseService;
    @Mock private TagRepository tagRepository;
    @Mock private PostRepository postRepository;
    @Mock private PostMapper postMapper;
    @Mock private CourseRepository courseRepository;
    @Mock private PostTagRepository postTagRepository;
    @Mock private LikesRepository likesRepository;
    @Mock private BookmarkRepository bookmarkRepository;

    private JwtTokenizer jwtTokenizer = new JwtTokenizer(new ObjectMapper());


    @ParameterizedTest
    @CsvSource(value = {"null", "''"}, delimiter = ':', nullValues = "null")
    @DisplayName("파라미터로 전달된 토큰(accessToken) 값이 빈 값이거나 null 일 경우, findVerifiedMember() 가 호출되지 않는다.")
    void findPosts_1(String accessToken) {

        // given
        int page = 0;
        int limit = 10;
        String sort = null;
        String tagName = null;

        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when
        postService.findPosts(page, limit, sort, accessToken, tagName);

        // then
        verify(memberService, never()).findVerifiedMember(accessToken);
    }

    @ParameterizedTest
    @CsvSource(value = {"INVALID TOKEN",
                        "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWxzdWRkbDI1QGdtYWlsLmNvbSIsInN1YiI6IntcInVzZXJuYW1lXCI6XCJhbHN1ZGRsMjVAZ21haWwuY29tXCIsXCJ0b2tlblR5cGVcIjpcIkFjY2Vzc1Rva2VuXCJ9IiwiaWF0IjoxNjg5MDU2Mzk5LCJleHAiOjE2OTIwNTYzOTl9.mDi7YsAR-4PciXKocwAQLjw7Czi22cxNUqSfsDri7OUpWza85a_pMUWNXsaBqiSXhRCXvs4K1Kzt-3rxlLbIog"},
            delimiter = ':', nullValues = "null")
    @DisplayName("파라미터로 전달된 토큰(accessToken) 값이 유효하든 유효하지 않든 예외가 발생하지 않는다.")
    void findPosts_2(String accessToken) {

        // given
        int page = 0;
        int limit = 10;
        String sort = null;
        String tagName = null;

        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when, then
        assertDoesNotThrow(() -> postService.findPosts(page, limit, sort, accessToken, tagName));
    }

    @DisplayName("tagName == null 이고, sort == null 일 경우, " +
            "courseRepository의 findAllByPostedOrderByUpdatedAt 메소드가 호출되고, 파라미터로 pageRequest 가 전달된다.")
    @Test
    void findPosts_4() {

        // given
        int page = 0;
        int limit = 10;
        String sort = null;
        String tagName = null;
        String accessToken1 = "INVALID TOKEN";

        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when
        postService.findPosts(page, limit, sort, accessToken1, tagName);

        // then
        verify(courseRepository).findAllByPostedOrderByUpdatedAt(any(PageRequest.class));
    }

    @ParameterizedTest
    @CsvSource(value = {"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWxzdWRkbDI1QGdtYWlsLmNvbSIsInN1YiI6IntcInVzZXJuYW1lXCI6XCJhbHN1ZGRsMjVAZ21haWwuY29tXCIsXCJ0b2tlblR5cGVcIjpcIkFjY2Vzc1Rva2VuXCJ9IiwiaWF0IjoxNjg5MDU2Mzk5LCJleHAiOjE2OTIwNTYzOTl9.mDi7YsAR-4PciXKocwAQLjw7Czi22cxNUqSfsDri7OUpWza85a_pMUWNXsaBqiSXhRCXvs4K1Kzt-3rxlLbIog"},
            delimiter = ':', nullValues = "null")
    @DisplayName("파라미터로 전달된 토큰(accessToken)이 유효한 토큰일 경우, findVerifiedMember() 가 호출된다.")
    void findPosts_3(String accessToken) {

        // given
        int page = 0;
        int limit = 10;
        String sort = null;
        String tagName = null;

        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when, then
        assertDoesNotThrow(() -> postService.findPosts(page, limit, sort, accessToken, tagName));
    }

    @DisplayName("tagName == null 이고, sort == 'like' 일 경우, " +
            "courseRepository의 findAllByPostedOrderByLikeCount 메소드가 호출되고, 파라미터로 pageRequest 가 전달된다.")
    @Test
    void findPosts_5() {

        // given
        int page = 0;
        int limit = 10;
        String sort = "like";
        String tagName = null;
        String accessToken1 = "INVALID TOKEN";

        given(courseRepository.findAllByPostedOrderByLikeCount(any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when
        postService.findPosts(page, limit, sort, accessToken1, tagName);

        // then
        verify(courseRepository).findAllByPostedOrderByLikeCount(any(PageRequest.class));
    }

    @DisplayName("tagName != null 일 경우, 전달된 String(tagName) 은 공백 기준으로 분리되고, " +
            "분리된 단어의 개수만큼 tagRepository.findByTagNameContaining 메서드가 호출된다.")
    @Test
    void findPosts_6() {

        // given
        int page = 0;
        int limit = 10;
        String sort = "like";
        String tagName = "tag1 tag2";
        String accessToken1 = "INVALID TOKEN";

        given(postTagRepository.findByTagInOrderByLikeCount(anyList(), any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when
        postService.findPosts(page, limit, sort, accessToken1, tagName);

        // then
        verify(tagRepository, times(2)).findByTagNameContaining(anyString());
    }

    @DisplayName("tagName != null 이고, sort == null 일 경우," +
            "postTagRepository.findByTagInOrderByUpdatedAt 메서드가 호출되고, 파라미터로 태그 리스트와 pageRequest 가 전달된다")
    @Test
    void findPosts_7() {

        // given
        int page = 0;
        int limit = 10;
        String sort = null;
        String tagName = "tag1 tag2";
        String accessToken1 = "INVALID TOKEN";

        given(postTagRepository.findByTagInOrderByUpdatedAt(anyList(), any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when
        postService.findPosts(page, limit, sort, accessToken1, tagName);

        // then
        verify(postTagRepository).findByTagInOrderByUpdatedAt(anyList(), any(PageRequest.class));
    }

    @DisplayName("tagName != null 이고, sort == 'like' 일 경우," +
            "postTagRepository.findByTagInOrderByLikeCount 메서드가 호출되고, 파라미터로 태그 리스트와 pageRequest 가 전달된다")
    @Test
    void findPosts_8() {

        // given
        int page = 0;
        int limit = 10;
        String sort = "like";
        String tagName = "tag1 tag2";
        String accessToken1 = "INVALID TOKEN";

        given(postTagRepository.findByTagInOrderByLikeCount(anyList(), any(PageRequest.class)))
                .willReturn(getDummyPageResult(1L, 1L, 1L));
        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());

        // when
        postService.findPosts(page, limit, sort, accessToken1, tagName);

        // then
        verify(postTagRepository).findByTagInOrderByLikeCount(anyList(), any(PageRequest.class));
    }


    private Page<Course> getDummyPageResult(Long courseId, Long postId, Long memberId) {

        Course testCourse = getDummyCourse(courseId, postId, memberId);
        return new PageImpl<>(List.of(testCourse), PageRequest.of(0, 10), 5);
    }

    private Course getDummyCourse(Long courseId, Long postId, Long memberId) {
        Course testCourse = new Course();
        testCourse.setPost(getDummyPost(postId));
        testCourse.setMember(getDummyMember(memberId));
        testCourse.setCourseId(courseId);
        testCourse.setCourseTitle("test course title" + courseId);
        testCourse.setCourseThumbnail("test course thumbnail" + courseId);
        testCourse.setCourseLikeCount(courseId * 10);
        testCourse.setCourseViewCount(courseId * 100);
        testCourse.setCourseUpdatedAt(LocalDateTime.now());

        return testCourse;
    }

    private Member getDummyMember(Long memberId) {
        Member testMember = new Member();
        testMember.setMemberNickname("testNick" + memberId);
        testMember.setMemberEmail("test" + memberId + "@email.com");

        return testMember;
    }

    private PostTag getDummyPostTag(String tagName) {
        return new PostTag("tag1");
    }

    private Post getDummyPost(Long postId) {
        PostTag testPostTag1 = getDummyPostTag("tag1");
        PostTag testPostTag2 = getDummyPostTag("tag2");

        Post testPost = new Post();
        testPost.setPostId(postId);
        testPost.setPostContent("test post content");
        testPost.setPostCreatedAt(LocalDateTime.now());
        testPost.setPostTagsInPost(List.of(testPostTag1, testPostTag2));

        return testPost;
    }


}