package com.example.blog.config;

import com.example.blog.filter.JwtAuthenticationFilter;
import com.example.blog.provider.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // Spring Security 설정 클래스
@EnableGlobalMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor // 롬복
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;


    @Bean
    public BCryptPasswordEncoder encoder() {
        // 비밀번호를 DB에 저장하기 전 사용할 암호화
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // jwt 토큰 사용을 위한 설정
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests() // '인증'이 필요하다
                .antMatchers("/api/user/**")
                .authenticated() // 마이페이지 인증 필요
                .antMatchers("/api/admin/**").hasRole("ADMIN") // 관리자 페이지
                .anyRequest().permitAll()

                .and()
                .headers()
                .frameOptions().sameOrigin();


        return http.build();

    }
}
