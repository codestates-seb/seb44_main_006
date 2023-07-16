package com.seb_main_006.domain.post.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_006.domain.bookmark.entity.Bookmark;
import com.seb_main_006.domain.bookmark.repository.BookmarkRepository;
import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.repository.CourseRepository;
import com.seb_main_006.domain.course.service.CourseService;
import com.seb_main_006.domain.like.entity.Likes;
import com.seb_main_006.domain.like.repository.LikesRepository;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.domain.post.dto.PostPostDto;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.mapper.PostMapper;
import com.seb_main_006.domain.post.repository.PostRepository;
import com.seb_main_006.domain.post.repository.PostTagRepository;
import com.seb_main_006.domain.tag.entity.Tag;
import com.seb_main_006.domain.tag.repository.TagRepository;
import com.seb_main_006.global.auth.jwt.JwtTokenizer;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;


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

    PageImpl<Course> dummyPageResult;
    Member dummyMember;
    Course dummyCourse;
    Post dummyPost;
    PostPostDto dummyPostDto;


    void initForFindPosts() {
        dummyPageResult = mock(PageImpl.class);
        dummyCourse = mock(Course.class);
        dummyMember = mock(Member.class);

        given(dummyCourse.getMember()).willReturn(dummyMember);
        given(dummyCourse.getPost()).willReturn(mock(Post.class));
        given(dummyPageResult.getContent()).willReturn(List.of(dummyCourse));

        given(likesRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
        given(bookmarkRepository.findByMemberAndCourse(any(Member.class), any(Course.class)))
                .willReturn(Optional.empty());
    }

    void initForDeletePost_1() {
        dummyPost = mock(Post.class);
        given(postRepository.findById(anyLong())).willReturn(Optional.of(dummyPost));

        dummyCourse = mock(Course.class);
        given(dummyPost.getCourse()).willReturn(dummyCourse);

        dummyMember = mock(Member.class);
        given(memberService.findVerifiedMember(anyString())).willReturn(dummyMember);
    }

    void initForDeletePost_2() {
        dummyPost = mock(Post.class);
        given(postRepository.findById(anyLong())).willReturn(Optional.of(dummyPost));

        dummyMember = mock(Member.class);
        given(memberService.findVerifiedMember(anyString())).willReturn(dummyMember);
    }

    void initForCreatePost() {
        dummyPostDto = mock(PostPostDto.class);
        given(dummyPostDto.getPostContent()).willReturn("post content");
        given(dummyPostDto.getCourseId()).willReturn(1L);

        dummyCourse = mock(Course.class);
        given(courseService.findVerifiedCourse(anyLong())).willReturn(dummyCourse);

        dummyMember = mock(Member.class);
        given(memberService.findVerifiedMember(anyString())).willReturn(dummyMember);

        // 예외 발생하지 않도록 mocking
        doNothing().when(courseService).verifyNotMyCourse(dummyMember, dummyCourse);
        given(postRepository.findByCourse(any(Course.class))).willReturn(Optional.empty());
    }


    @DisplayName("findVerifiedMember(), findVerifiedCourse() 메서드가 1번씩 호출되어야 한다.")
    @Test
    void createPost_1() {
        // given
        initForCreatePost();

        // when
        postService.createPost(dummyPostDto, "member@email.com");

        // then
        verify(memberService, times(1)).findVerifiedMember(anyString());
        verify(courseService, times(1)).findVerifiedCourse(anyLong());
    }

    @DisplayName("postPostDto로 전달된 tags 배열의 길이만큼 tagRepository.findByTagName() 메서드가 호출된다.")
    @Test
    void createPost_2() {
        // given
        initForCreatePost();
        given(dummyPostDto.getTags()).willReturn(new ArrayList<>(List.of("tag1", "tag2"))); // 2개의 요소를 갖는 태그 리스트 반환하도록 mocking

        // when
        postService.createPost(dummyPostDto, "member@email.com");

        // then
        verify(tagRepository, times(2)).findByTagName(anyString());
    }

    @DisplayName("tagRepository.findByTagName() 메서드가 호출되었을 때, " +
            "결과값이 존재하지 않을 경우에만 tagRepository.save() 메서드가 호출된다.")
    @Test
    void createPost_3() {
        // given
        initForCreatePost();
        given(dummyPostDto.getTags()).willReturn(new ArrayList<>(List.of("tag1", "tag2", "tag3"))); // 3개의 요소를 갖는 태그 리스트 반환하도록 mocking
        given(tagRepository.findByTagName("tag1")).willReturn(Optional.empty()); // 결과 X
        given(tagRepository.findByTagName("tag2")).willReturn(Optional.empty()); // 결과 X
        given(tagRepository.findByTagName("tag3")).willReturn(Optional.of(new Tag("tag3"))); // 결과 O

        // when
        postService.createPost(dummyPostDto, "member@email.com");

        // then
        verify(tagRepository, times(2)).save(any(Tag.class));
    }



    @ParameterizedTest
    @CsvSource(value = {"null", "''"}, delimiter = ':', nullValues = "null")
    @DisplayName("파라미터로 전달된 토큰(accessToken) 값이 빈 값이거나 null 일 경우, findVerifiedMember() 가 호출되지 않는다.")
    void findPosts_1(String accessToken) {
        // given
        initForFindPosts();
        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when
        postService.findPosts(0, 10, null, accessToken, null);

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
        initForFindPosts();
        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when, then
        assertDoesNotThrow(() -> postService.findPosts(0, 10, null, accessToken, null));
    }

    @DisplayName("파라미터로 전달된 토큰(accessToken)이 유효한 토큰일 경우, findVerifiedMember() 가 호출된다.")
    @Test
    void findPosts_3() {
        // given
        initForFindPosts();
        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when, then
        String validAccessToken = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWxzdWRkbDI1QGdtYWlsLmNvbSIsInN1YiI6IntcInVzZXJuYW1lXCI6XCJhbHN1ZGRsMjVAZ21haWwuY29tXCIsXCJ0b2tlblR5cGVcIjpcIkFjY2Vzc1Rva2VuXCJ9IiwiaWF0IjoxNjg5MDU2Mzk5LCJleHAiOjE2OTIwNTYzOTl9.mDi7YsAR-4PciXKocwAQLjw7Czi22cxNUqSfsDri7OUpWza85a_pMUWNXsaBqiSXhRCXvs4K1Kzt-3rxlLbIog";
        assertDoesNotThrow(() -> postService.findPosts(0, 10, null, validAccessToken, null));
    }

    @DisplayName("tagName == null 이고, sort == null 일 경우, " +
            "courseRepository의 findAllByPostedOrderByUpdatedAt 메소드가 호출되고, 파라미터로 pageRequest 가 전달된다.")
    @Test
    void findPosts_4() {
        // given
        initForFindPosts();
        given(courseRepository.findAllByPostedOrderByUpdatedAt(any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when
        String sort = null;
        String tagName = null;
        postService.findPosts(0, 10, sort, "INVALID TOKEN", tagName);

        // then
        verify(courseRepository).findAllByPostedOrderByUpdatedAt(any(PageRequest.class));
    }

    @DisplayName("tagName == null 이고, sort == 'like' 일 경우, " +
            "courseRepository의 findAllByPostedOrderByLikeCount 메소드가 호출되고, 파라미터로 pageRequest 가 전달된다.")
    @Test
    void findPosts_5() {
        // given
        initForFindPosts();
        given(courseRepository.findAllByPostedOrderByLikeCount(any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when
        String sort = "like";
        String tagName = null;
        postService.findPosts(0, 10, sort, "INVALID TOKEN", tagName);

        // then
        verify(courseRepository).findAllByPostedOrderByLikeCount(any(PageRequest.class));
    }

    @ParameterizedTest
    @CsvSource(value = {"tag1", "tag1 tag2 tag3", "tag1 tag2 tag3 tag4 tag5"}, delimiter = ':', nullValues = "null")
    @DisplayName("tagName != null 일 경우, 전달된 String(tagName) 은 공백 기준으로 분리된 단어의 개수만큼 tagRepository.findByTagNameContaining 메서드가 호출된다.")
    void findPosts_6(String tagName) {
        // given
        initForFindPosts();
        given(postTagRepository.findByTagInOrderByLikeCount(anyList(), any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when
        postService.findPosts(0, 10, "like", "INVALID TOKEN", tagName);

        // then
        int length = tagName.split(" ").length;
        verify(tagRepository, times(length)).findByTagNameContaining(anyString());
    }

    @DisplayName("tagName != null 이고, sort == null 일 경우," +
            "postTagRepository.findByTagInOrderByUpdatedAt 메서드가 호출되고, 파라미터로 태그 리스트와 pageRequest 가 전달된다")
    @Test
    void findPosts_7() {
        // given
        initForFindPosts();
        given(postTagRepository.findByTagInOrderByUpdatedAt(anyList(), any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when
        String sort = null;
        String tagName = "tag1 tag2";
        postService.findPosts(0, 10, sort, "INVALID TOKEN", tagName);

        // then
        verify(postTagRepository).findByTagInOrderByUpdatedAt(anyList(), any(PageRequest.class));
    }

    @DisplayName("tagName != null 이고, sort == 'like' 일 경우," +
            "postTagRepository.findByTagInOrderByLikeCount 메서드가 호출되고, 파라미터로 태그 리스트와 pageRequest 가 전달된다")
    @Test
    void findPosts_8() {
        // given
        initForFindPosts();
        given(postTagRepository.findByTagInOrderByLikeCount(anyList(), any(PageRequest.class)))
                .willReturn(dummyPageResult);

        // when
        String sort = "like";
        String tagName = "tag1 tag2";
        postService.findPosts(0, 10, sort, "INVALID TOKEN", tagName);

        // then
        verify(postTagRepository).findByTagInOrderByLikeCount(anyList(), any(PageRequest.class));
    }


    @DisplayName("ADMIN Role을 가진 멤버가 아니라면 courseService.verifyNotMyCourse() 메서드가 호출된다.")
    @Test
    void deletePost_1() {
        // given
        initForDeletePost_1();
        given(dummyMember.getRoles()).willReturn(List.of("USER"));

        // when
        postService.deletePost(1L, "notAdmin@email.com");

        // then
        verify(courseService).verifyNotMyCourse(dummyMember, dummyCourse);
    }

    @DisplayName("ADMIN Role을 가진 멤버일 경우 courseService.verifyNotMyCourse() 메서드가 호출되지 않는다. " +
            "(본인의 일정이 아닐 경우 예외 발생하는 메서드)")
    @Test
    void deletePost_2() {
        // given
        initForDeletePost_1();
        given(dummyMember.getRoles()).willReturn(List.of("USER", "ADMIN"));

        // when
        postService.deletePost(1L, "admin@email.com");

        // then
        verify(courseService, never()).verifyNotMyCourse(dummyMember, dummyCourse);
    }

    @DisplayName("course 의 isPosted 는 false 로 바뀌어야 한다.")
    @Test
    void deletePost_3() {
        // given
        initForDeletePost_2();

        dummyCourse = new Course();
        dummyCourse.setPosted(true);
        given(dummyPost.getCourse()).willReturn(dummyCourse);

        // when
        assertThat(dummyCourse.isPosted()).isTrue();
        postService.deletePost(1L, "notAdmin@email.com");

        // then
        assertThat(dummyCourse.isPosted()).isFalse();
    }

    @DisplayName("post가 삭제되면, course와 post 및 like, bookmarks 와의 연관관계가 모두 제거되어야 한다.")
    @Test
    void deletePost_4() {
        // given
        initForDeletePost_2();

        dummyCourse = new Course();
        dummyCourse.setLikesInCourse(new ArrayList<>(List.of(new Likes()))); // 기존 좋아요 1개라고 가정
        dummyCourse.setBookmarksInCourse(new ArrayList<>(List.of(new Bookmark()))); // 기존 즐겨찾기 1개라고 가정
        given(dummyPost.getCourse()).willReturn(dummyCourse);

        // when
        assertThat(dummyCourse.getLikesInCourse().size()).isEqualTo(1); // 호출 전 사이즈 1
        assertThat(dummyCourse.getBookmarksInCourse().size()).isEqualTo(1); // 호출 전 사이즈 1
        postService.deletePost(1L, "notAdmin@email.com");

        // then
        assertThat(dummyCourse.getLikesInCourse().size()).isEqualTo(0);  // 호출 후 사이즈 0
        assertThat(dummyCourse.getBookmarksInCourse().size()).isEqualTo(0); // 호출 후 사이즈 0
    }

    @DisplayName("post가 삭제되면, course 의 courseLikeCount, couresViewCount 모두 0이 되어야 한다.")
    @Test
    void deletePost_5() {
        // given
        initForDeletePost_2();

        dummyCourse = new Course();
        dummyCourse.setCourseLikeCount(10L); // 기존 likeCount 10
        dummyCourse.setCourseViewCount(100L); // 기존 viewCount 100
        given(dummyPost.getCourse()).willReturn(dummyCourse);

        // when
        assertThat(dummyCourse.getCourseLikeCount()).isEqualTo(10); // 호출 전 likeCount 10
        assertThat(dummyCourse.getCourseViewCount()).isEqualTo(100); // 호출 전 viewCount 100
        postService.deletePost(1L, "notAdmin@email.com");

        // then
        assertThat(dummyCourse.getCourseLikeCount()).isEqualTo(0); // 호출 후 likeCount 0
        assertThat(dummyCourse.getCourseViewCount()).isEqualTo(0); // 호출 후 viewCount 0
    }

    @DisplayName("likeRepository.deleteAllByCourse(), bookmarkRepository.deleteAllByCourse(), postRepository.delete() 가 1회씩 호출되어야 한다.")
    @Test
    void deletePost_6() {
        // given
        initForDeletePost_1();

        // when
        postService.deletePost(1L, "notAdmin@email.com");

        // then
        verify(likesRepository, times(1)).deleteAllByCourse(dummyCourse);
        verify(bookmarkRepository, times(1)).deleteAllByCourse(dummyCourse);
        verify(postRepository, times(1)).delete(dummyPost);
    }


    @DisplayName("파라미터로 전달받은 Course Id를 갖는 Post가 DB에 존재할 경우(이미 해당 코스로 게시글이 존재하는 경우), " +
            "BusinessLogicException이 발생하고, 그 때 예외 코드는 POST_EXISTS 이다.")
    @Test
    void verifyExistCourseTest_1() {
        // given
        given(postRepository.findByCourse(any(Course.class))).willReturn(Optional.of(new Post()));

        // when
        BusinessLogicException ex = assertThrows(BusinessLogicException.class, () -> postService.verifyExistCourse(new Course()));

        // then
        assertThat(ex.getExceptionCode()).isEqualTo(ExceptionCode.POST_EXISTS);

    }

    @DisplayName("파라미터로 전달받은 Course가 DB에 없을 경우 예외가 발생하지 않는다.")
    @Test
    void verifyExistCourseTest_2() {
        // given
        given(postRepository.findByCourse(any(Course.class))).willReturn(Optional.empty());

        // when, then
        assertDoesNotThrow(() -> postService.verifyExistCourse(new Course()));
    }

    @DisplayName("파라미터로 전달받은 postId 에 해당하는 Post가 DB에 없을 경우, " +
            "BusinessLogicException이 발생하고, 그 때 예외 코드는 POST_NOT_FOUND 이다")
    @Test
    void findVerifiedPostTest_1() {
        // given
        given(postRepository.findById(anyLong())).willReturn(Optional.empty());

        // when
        BusinessLogicException ex = assertThrows(BusinessLogicException.class, () -> postService.findVerifiedPost(anyLong()));

        // then
        assertThat(ex.getExceptionCode()).isEqualTo(ExceptionCode.POST_NOT_FOUND);
    }

    @DisplayName("파라미터로 전달받은 PostId에 해당하는 Post가 DB에 존재할 경우, 예외가 발생하지 않는다.")
    @Test
    void findVerifiedPostTest_2() {
        // given
        given(postRepository.findById(anyLong())).willReturn(Optional.of(new Post()));

        // when, then
        assertDoesNotThrow(() -> postService.findVerifiedPost(anyLong()));
    }

    @DisplayName("전달받은 postId에 해당하는 Post와 연관관계인 Course의 viewCount를 1 증가시킨다.")
    @Test
    void viewCountUpTest_1() {
        // given
        dummyPost = mock(Post.class);
        given(postRepository.findById(anyLong())).willReturn(Optional.of(dummyPost));

        dummyCourse = new Course();
        dummyCourse.setCourseViewCount(0L); // 기존 viewCount 100
        given(dummyPost.getCourse()).willReturn(dummyCourse);

        // when
        assertThat(dummyCourse.getCourseViewCount()).isEqualTo(0L);
        postService.viewCountUp(1L);

        // then
        assertThat(dummyCourse.getCourseViewCount()).isEqualTo(1L);
    }

}