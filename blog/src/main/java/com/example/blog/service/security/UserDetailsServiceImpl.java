package com.example.blog.service.security;

import com.example.blog.model.entity.UserDetailsImpl;
import com.example.blog.model.entity.UserInfo;
import com.example.blog.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    //    TODO: 로그인시 ID의 값과 같은 정보를 DB에서 찾는다.

    private final UserInfoRepository userInfoRepository;

    @Override
    public UserDetailsImpl loadUserByUsername(String userId) throws UsernameNotFoundException {
//        만약 User 객체가 null 일 경우 에러를 던진다.
        UserInfo findUser = userInfoRepository.findByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("can't find user with this email. ->" + userId));

        if (findUser != null) {
            UserDetailsImpl userDetails = new UserDetailsImpl(findUser);
            return userDetails;
        }
        return null;
    }

}
