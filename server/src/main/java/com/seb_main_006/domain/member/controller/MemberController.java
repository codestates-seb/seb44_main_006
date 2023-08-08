package com.seb_main_006.domain.member.controller;

import com.seb_main_006.domain.member.dto.MemberPatchDto;
import com.seb_main_006.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;

    // 마이페이지 조회
    @GetMapping
    public ResponseEntity getMember(@AuthenticationPrincipal(expression = "username") String memberEmail) {

        return new ResponseEntity<>(memberService.getMyPage(memberEmail), HttpStatus.OK);
    }

    // 멤버 닉네임 수정
    @PatchMapping
    public ResponseEntity updateMember(@RequestBody MemberPatchDto memberPatchDto,
                                       @AuthenticationPrincipal(expression = "username") String memberEmail) {

        memberService.updateMember(memberPatchDto, memberEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 멤버 프로필 이미지 수정
    @PatchMapping(value="/updateimg",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity updateImgMember(@AuthenticationPrincipal(expression = "username") String memberEmail,
                                          @RequestParam(value="img") MultipartFile img) throws IOException {

        memberService.updateImgMember(memberEmail, img);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity deleteMember(@AuthenticationPrincipal(expression = "username") String memberEmail) {

        memberService.deleteMember(memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
