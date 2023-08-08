package com.seb_main_006.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.context.Context;

@Configuration
public class MailConfiguration {

    // MailService에서 사용하는 context를 등록하기 위한 코드
    @Bean
    public Context context() {
        return new Context();
    }
}
