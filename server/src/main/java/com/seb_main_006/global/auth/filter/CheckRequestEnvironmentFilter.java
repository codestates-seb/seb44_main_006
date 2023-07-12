package com.seb_main_006.global.auth.filter;

import com.seb_main_006.global.auth.redis.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@Component
@Order(Integer.MIN_VALUE)
@RequiredArgsConstructor
public class CheckRequestEnvironmentFilter implements Filter {

    private final RedisUtil redisUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        String host = httpServletRequest.getHeader("host");
        log.info("host = {}", host);

        if (host.equals("localhost:5173")) {
            log.info("check: local request");
            redisUtil.set("local", "true");
        }

        chain.doFilter(request, response);
    }
}
