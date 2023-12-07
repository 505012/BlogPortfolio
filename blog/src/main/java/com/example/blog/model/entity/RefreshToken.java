package com.example.blog.model.entity;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * packageName : com.example.demo.model.entity
 * fileName : RefreshToken
 * author : GGG
 * date : 2023-11-09
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-09         GGG          최초 생성
 */
@Getter
@RedisHash(value = "refreshToken", timeToLive = 86400000)
public class RefreshToken {
    @Id
    private String id;
    private String refreshToken;
    private LocalDateTime createAt;

    public RefreshToken(String id , String refreshToken) {
        this.id = id;
        this.refreshToken = refreshToken;
        this.createAt = LocalDateTime.now();
    }
}
