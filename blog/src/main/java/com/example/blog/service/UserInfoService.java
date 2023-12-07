package com.example.blog.service;

import com.example.blog.model.dto.AuthDto;
import com.example.blog.model.entity.RefreshToken;
import com.example.blog.model.entity.Role;
import com.example.blog.model.entity.UserInfo;
import com.example.blog.provider.JwtTokenProvider;
import com.example.blog.repository.RedisRepository;
import com.example.blog.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserInfoService {
    @Autowired
    UserInfoRepository userInfoRepository;
    private final RedisRepository redisRepository;
    private final JwtTokenProvider jwtTokenProvider;


    //    로그인시 패스워드를 비교
    public String login(String userId, String password) throws UsernameNotFoundException {
        UserInfo user = userInfoRepository.findByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("유저 에러에러"));

        if (user.getPassword().equals(password) && user != null) {
//            System.out.println("토큰 생성시 userId 값과 role 입니다. : " + userId + " " + user.getRole());
            AuthDto.TokenDto token =
                    jwtTokenProvider.createToken(userId, user.getRole().toString());
            String accessToken = token.getAccessToken();
            String refreshToken = token.getRefreshToken();

//            TODO : redis 에 저장
            RefreshToken saveRefreshToken =
                    new RefreshToken(user.getUserId() , refreshToken);
            redisRepository.save(saveRefreshToken);
            System.out.println(accessToken);
            return accessToken;
        }
        return null;
    }


    /**
     * id로 찾기
     */
    public UserInfo findByEmail(String id) {
        UserInfo findUser = userInfoRepository.findByUserId(id).orElseThrow(() -> new UsernameNotFoundException("can't find user with this email. ->" + id));
        return findUser;
    }


    /**
     * TODO : 유저 정보 저장
     */
    public UserInfo save(UserInfo user) {
        user.setRole(Role.USER);
        UserInfo user1 = userInfoRepository.save(user);
        return user1;
    }

    /**
     * TODO : id 로 유저정보 찾기
     */
    public Optional<UserInfo> findById(String userId) {
        Optional<UserInfo> optionalUser = userInfoRepository.findById(userId);
        return optionalUser;
    }
}
