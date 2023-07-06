package com.seb_main_006.domain.member.controller;

import com.seb_main_006.domain.member.dto.MemberPatchDto;
import com.seb_main_006.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;

    @PatchMapping
    public ResponseEntity updateMember(@RequestBody MemberPatchDto memberPatchDto,
                                       @AuthenticationPrincipal(expression = "username") String memberEmail) {

        memberService.updateMember(memberPatchDto, memberEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember(@AuthenticationPrincipal(expression = "username") String memberEmail) {

        memberService.deleteMember(memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
