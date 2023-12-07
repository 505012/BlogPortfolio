package com.example.blog.controller;

import com.example.blog.model.entity.UserInfo;
import com.example.blog.provider.JwtTokenProvider;
import com.example.blog.repository.RedisRepository;
import com.example.blog.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserInfoController {
    @Autowired
    RedisRepository redisRepository;
    @Autowired
    UserInfoService userInfoService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("user/userInfo/{accessToken}")
    public ResponseEntity<Object> getUserInfo(@PathVariable String accessToken) {
        System.out.println("ㄴㄴ");
        try {
            System.out.println("성공");
            String userId = jwtTokenProvider.getClaims(accessToken).get("userId").toString();
            System.out.println("성공2 : " + userId);
            Optional<UserInfo> optionalUserInfo = userInfoService.findById(userId);
            System.out.println("성공3 : " + optionalUserInfo.get());
            return new ResponseEntity<>(optionalUserInfo,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("실패");
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody UserInfo user) {
        try {
            String accessToken = userInfoService.login(user.getUserId(), user.getPassword());
            log.info("accessToken : " + accessToken);
            HttpHeaders headers = new HttpHeaders();
            System.out.println("headers : " + headers);
            headers.add("Authorization", "Bearer " + accessToken);
            return ResponseEntity.ok().headers(headers).build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody UserInfo user) {
        try {
            
            UserInfo user1 = userInfoService.save(user);
            return new ResponseEntity<>(user1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/user/board")
    public ResponseEntity<Object> getAll() {
        return new ResponseEntity<>("됬어요!", HttpStatus.ACCEPTED);
    }
}

