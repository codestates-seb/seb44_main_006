package com.seb_main_006.domain.post.mapper;

import com.seb_main_006.domain.answer.dto.AnswerResponseDto;
import com.seb_main_006.domain.answer.entity.Answer;
import com.seb_main_006.domain.course.dto.DestinationPostDto;
import com.seb_main_006.domain.destination.entity.Destination;
import com.seb_main_006.domain.post.dto.PostDetailResponseDto;
import com.seb_main_006.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    DestinationPostDto destinationToDestinationDto(Destination destination);

    List<DestinationPostDto> destinationsToDestinationDtos(List<Destination> destinationList);

    @Mapping(source = "member.memberNickname", target = "answererNickname")
    @Mapping(source = "member.memberEmail", target = "answererEmail")
    @Mapping(source = "member.memberImageUrl", target = "answererImageUrl")
    AnswerResponseDto answerToAnswerDto(Answer answer);

    List<AnswerResponseDto> answersToAnswerDtos(List<Answer> answerList);

    @Mapping(source = "course.courseTitle" , target = "courseTitle")
    @Mapping(source = "post.postContent" , target = "postContent")
    @Mapping(source = "course.courseViewCount" , target = "courseViewCount")
    @Mapping(source = "course.courseLikeCount" , target = "courseLikeCount")
    @Mapping(source = "course.courseUpdatedAt" , target = "courseUpdatedAt")
    @Mapping(source = "course.member.memberNickname" , target = "memberNickname")
    @Mapping(source = "course.member.memberEmail" , target = "memberEmail")
    @Mapping(source = "course.member.memberImageUrl" , target = "memberImageUrl")
    PostDetailResponseDto postToPostDetailResponseDto(Post post);
}
