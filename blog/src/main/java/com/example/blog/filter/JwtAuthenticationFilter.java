package com.example.blog.filter;

import com.example.blog.model.entity.UserInfo;
import com.example.blog.provider.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

    //    TODO: Http Request 헤더로부터 토큰 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
//        System.out.println("bearerToken 을 받습니다,  : " + bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    //    TODO: ACCESS 토큰을 추출한 것에 토큰을 검증한다.
//      만약 토큰이 잘못된 경우 CATCH 로 잡고
//           토큰의 검증이 통과된 경우 다음 필터로 request , response를 넘긴다.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("- - - - - 필터가 실행되었습니다. - - - - -");
//        Access Token 추출
        String accessToken = resolveToken(request);
        System.out.println("엑서스 토큰을 추출합니다. :" + accessToken);

//        TODO : Access 토큰이 잘되었다면 바로 인증 객체에 넣는다.
        try {
            if (accessToken != null && jwtTokenProvider.validateAccessToken(accessToken)) {
//               TODO: 만약 Access 토큰의 검증이 끝났다면 DB를 참조하여 인증된 객체값을 가져온다.
                Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
//                TODO : 만약 토큰의 검증이 끝나면 Authentication 에 집어 넣는다.
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Save authentication in SecurityContextHolder");
            }

            //     TODO : 그런데 만약? Access 토큰이 만료시간만 지났다면? 리프레쉬 토큰을 검사해준다.  : 이부분 수정
            if (jwtTokenProvider.validateAccessTokenOnlyExpired(accessToken) && jwtTokenProvider.isRefreshToken(accessToken)) {
                //  TODO: 만약 Access 토큰의 검증이 끝났다면 DB를 참조하여 인증된 객체값을 가져온다.
                Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
//                  TODO : 만약 토큰의 검증이 끝나면 Authentication 에 집어 넣는다.
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Save authentication in SecurityContextHolder");
            }


        } catch (IllegalArgumentException e) { // 잘못된 토큰인 경우
            SecurityContextHolder.clearContext();
            log.debug("Invalid JWT Token");
        } catch (UsernameNotFoundException e) { // 회원을 찾을수 없는 경우
            SecurityContextHolder.clearContext();
            log.debug("Can't find user.");
        }
        filterChain.doFilter(request, response);
    }


}
