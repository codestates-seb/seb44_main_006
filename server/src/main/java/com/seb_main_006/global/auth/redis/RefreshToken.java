package com.seb_main_006.global.auth.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "refresh", timeToLive = 1209600)
public class RefreshToken {

    @Id
    private String id;

    private List<String> authorities;

    @Indexed
    private String username;

    @Indexed
    private String refreshToken;
}
