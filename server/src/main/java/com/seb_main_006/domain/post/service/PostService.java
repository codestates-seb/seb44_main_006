package com.seb_main_006.domain.post.service;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.course.service.CourseService;
import com.seb_main_006.domain.member.entity.Member;
import com.seb_main_006.domain.member.service.MemberService;
import com.seb_main_006.domain.post.dto.PostPostDto;
import com.seb_main_006.domain.post.entity.Post;
import com.seb_main_006.domain.post.entity.PostTag;
import com.seb_main_006.domain.post.repository.PostRepository;
import com.seb_main_006.domain.tag.entity.Tag;
import com.seb_main_006.domain.tag.repository.TagRepository;
import com.seb_main_006.global.exception.BusinessLogicException;
import com.seb_main_006.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final MemberService memberService;
    private final CourseService courseService;
    private final TagRepository tagRepository;
    private final PostRepository postRepository;

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
        for(int i=0; i<inputTags.size(); i++){

            String tagName = inputTags.get(i); //입력받은 태그 이름 인덱스로 꺼내옴

            PostTag newPostTag = new PostTag(); //저장할 새로운 PostTag선언

            Optional<Tag> optionalTag = tagRepository.findByTagName(tagName); //Tag테이블에서 tagName으로 값이 존재하는 지 확인

            // 존재할 경우 newPostTag에 가져온 tag 저장
            if(optionalTag.isPresent()){
               Tag findTag = optionalTag.get();
                newPostTag.setTag(findTag);
            }
            // 존재하지 않을 경우 tag테이블에 저장 후 newPostTag에 저장
            else{
                newPostTag.setTag(tagRepository.save(new Tag(tagName)));
            }
            newPostTag.setPost(post); // new PostTag에 Post세팅(연관관계 매핑)
            post.getPostTagsInPost().add(newPostTag);// post의 PostTagsInpost리스트에 newPostTag 추가(연관관계 매핑)
        }
        //Post 테이블에 저장
        return postRepository.save(post);
    }

    //해당 코스로 작성된 게시글이 있는지 확인하는 메소드
    private void verifyExistCourse(Course course){
        if(postRepository.findByCourse(course).isPresent()){
            throw new BusinessLogicException(ExceptionCode.POST_EXISTS);
        }
    }
}
