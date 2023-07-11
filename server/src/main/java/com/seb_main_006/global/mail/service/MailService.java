package com.seb_main_006.global.mail.service;

import com.seb_main_006.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class MailService {

    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;
    private final Context context;

    public void send(Member member) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            String html = setContext(member, "MailTemplate");
            mimeMessageHelper.setTo(member.getMemberEmail());
            mimeMessageHelper.setSubject("HaruMate 가입을 축하합니다.");
            mimeMessageHelper.setText(html, true);

            javaMailSender.send(mimeMessage);

        } catch (Exception e) {

        }
    }
    private String setContext(Member member, String templateName) {

        context.setVariable("memberNickname", member.getMemberNickname());

        return templateEngine.process(templateName, context);
    }

//    //폼 없이 글자만 보내는 형태
//    public void mailSend(MailDto mailDto) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("HaruMate");
//        message.setTo(mailDto.getAddress());
//        message.setSubject(mailDto.getTitle());
//        message.setText(mailDto.getMessage());
//
//        mailSender.send(message);
//    }
}
