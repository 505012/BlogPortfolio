package com.example.blog.model.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AuthDto {

    // 로그인시 생성됨 (회원 id, pass 저장)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginDto {
        private String email;
        private String password;

        @Builder
        public LoginDto(String email, String password) {
            this.email = email;
            this.password = password;
        }
    }
    // 회원 가입시 생성됨
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class SignupDto {
        private String email;
        private String password;

        @Builder
        public SignupDto(String email, String password) {
            this.email = email;
            this.password = password;
        }

        //        회원가입 할 signupDto, UserDetialsImpl을 생성할때 사용하기도 함
        public static SignupDto encodePassword(SignupDto signupDto, String encodedPassword) {
            SignupDto newSignupDto = new SignupDto();
            newSignupDto.email = signupDto.getEmail();
            newSignupDto.password = encodedPassword; // 인코딩된 패스워드 저장
            return newSignupDto;
        }
    }
    // 로그인시 생성됨(토큰 정보)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class TokenDto {
        private String accessToken;
        private String refreshToken;

        public TokenDto(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }

}
