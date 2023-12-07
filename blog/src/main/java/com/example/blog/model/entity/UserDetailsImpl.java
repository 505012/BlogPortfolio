package com.example.blog.model.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class UserDetailsImpl implements UserDetails {

    //      TODO : 속성
    private final UserInfo userInfo;

    //    TODO : 생성자
    public UserDetailsImpl(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    //    TODO : 오버라이딩 필수 설정들

    //    TODO: User 객체의 권한을 가져옴 key = USER , ADMIN
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(() -> userInfo.getRole().getKey());
        return authorities;
    }

    public String getUserId() {
        return userInfo.getUserId();
    }

    @Override
    public String getPassword() {
        return userInfo.getEmail();
    }

    @Override
    public String getUsername() {
        return userInfo.getPassword();
    }


    //    TODO: 리프레쉬 토큰 만료시간이 되었는지 확인을 위해 넣었습니다.
    public String getRefreshToken() {return userInfo.getRefreshToken();}

    // TODO : 세부 설정들 : 지금은 안쓰니깐 TRUE 로
    @Override
    public boolean isAccountNonExpired() {
        return true;
    } // 계정 만료 여부

    @Override
    public boolean isAccountNonLocked() {
        return true;
    } // 계정 잠김 여부

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    } // 비밀번호 만료 여부

    @Override
    public boolean isEnabled() {
        return true;
    } // 계정의 활성화 여부

}
