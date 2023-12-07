package com.example.blog.provider;

import com.example.blog.model.dto.AuthDto;
import com.example.blog.model.entity.RefreshToken;
import com.example.blog.model.entity.UserDetailsImpl;
import com.example.blog.repository.RedisRepository;
import com.example.blog.service.security.UserDetailsServiceImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Component
public class JwtTokenProvider implements InitializingBean {

    private final UserDetailsServiceImpl userDetailsService;
    private static final String AUTHORITIES_KEY = "role"; // 권한키
    private static final String USER_KEY = "userId"; // id 에 대한 키
    private static final String url = "https://localhost:8888"; // 로컬호스트 에 대한 키

    private final String secretKey;
    private static Key signingKey;

    private final Long accessTokenValidityInMilliseconds;
    private final Long refreshTokenValidityInMilliseconds;

    @Autowired
    RedisRepository redisRepository;

    public JwtTokenProvider(UserDetailsServiceImpl userDetailsService,
                            @Value("${jwt.secret}") String secretKey,
                            @Value("${jwt.access-token-validity-in-seconds}") Long accessTokenValidityInMilliseconds,
                            @Value("${jwt.refresh-token-validity-in-seconds}") Long refreshTokenValidityInMilliseconds) {
        this.userDetailsService = userDetailsService;
        this.secretKey = secretKey;
        this.accessTokenValidityInMilliseconds = accessTokenValidityInMilliseconds;
        this.refreshTokenValidityInMilliseconds = refreshTokenValidityInMilliseconds;
    }

    //    TODO : 시크릿 키를 암호화해서 signingKey에 넣는다.
    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] secretKeyBytes = Decoders.BASE64.decode(secretKey);
        signingKey = Keys.hmacShaKeyFor(secretKeyBytes);
    }
    //    TODO : 로그인이 되어있다면 패스워드를 비교를 해야한다.
    //    TODO : 그전에 토큰에서 정보 추출을 먼저 하자

    public Claims getClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.debug(e.getMessage());
            return e.getClaims();
        }
    }
    //    TODO : 이제 패스워드를 비교를 해야한다. 그전엔 토큰안의 이메일을 가져와서
//      인증 객체를 리턴해주어야 한다. 패스워드 비교는 service에서 하자
    public Authentication getAuthentication(String token) {
//        TODO: AccessToken 에 있는 이메일 값을 가져와서 userDetails에 넣습니다.
        String userId = getClaims(token).get(USER_KEY).toString();
//        System.out.println("토큰에 저장된 userId 값입니다. : " + userId);
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(userId);
//        System.out.println("토큰 userId을 비교해서 받은 넘버값 : " + userDetails.getUserId());
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    //        TODO: 만약 엑세스 토큰의 만료시간만 끝난것이 라면, 프레쉬 토큰을 검증해줍니다? 확인을 해줍니다.
    public boolean isRefreshToken(String accessToken) {
        String userId = getClaims(accessToken).get(USER_KEY).toString();
//        System.out.println("토큰에 저장된 userId 값입니다. : " + userId);
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(userId);
//        TODO : 이 부분을 수정해야함
        Optional<RefreshToken> optionalRefreshToken = redisRepository.findById(userDetails.getUserId());
        String refreshToken = optionalRefreshToken.get().getRefreshToken();
//        System.out.println("리프레쉬 토큰을 useDetails에서 추출합니다. : " + refreshToken);
        if(refreshToken != null && validateRefreshToken(refreshToken)) {
            return true;
        }
        return false;
    }

    //    TODO : FILTER에서 토큰 검증을 한다.
    public boolean validateAccessToken(String accessToken) {
        try {
            Jwts.parserBuilder().setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(accessToken);
            System.out.println("Access 토큰의 검증이 끝났어요! 필터로 갈게요");
            return true;
        } catch (ExpiredJwtException e) { // 만료시간 검증
            System.out.println("access 토큰의 만료시간이 지났습니다.");
            log.debug(e.getMessage());
            return false;
        } catch (Exception e) { // 나머지 에러들
            log.debug(e.getMessage());
            return false;
        }
    }

    //    TODO: 리프레쉬 토큰 검증이다. 이것도 필터에서 검증한다.
    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(refreshToken);
            System.out.println("Refresh 토큰의 검증이 끝났어요!!");
            return true;
        } catch (SignatureException e) {        // 서명 에러
            log.error("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token.");
        } catch (ExpiredJwtException e) {       // 만료시간 에러
            System.out.println("리프레쉬 토큰도 만료시간이 지났군요!!");
            log.error("Expired JWT token.");
        } catch (UnsupportedJwtException e) {   // 더이상 사용되지 않음
            log.error("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {      // 내용이 비엇음
            log.error("JWT claims string is empty.");
        } catch (NullPointerException e) {      // 토큰이 null값임
            log.error("JWT Token is empty.");
        }
        return false;
    }

    //    TODO: Access 토큰 생성 구문이다.
    public AuthDto.TokenDto createToken(String userId, String authorities) {
        Long now = System.currentTimeMillis();

//        TODO : accessToken 생성
        String accessToken = Jwts.builder()
                .setHeaderParam("typ", "JWT") // 타입은 jwt 이다
                .setHeaderParam("alg", "HS512") // 알고리즘은 HS512 를 썻다
                .setExpiration(new Date(now + accessTokenValidityInMilliseconds)) // 만료 시간 설정
                .setSubject("access-token")
                .claim(url, true)
                .claim(USER_KEY, userId)
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();

//    TODO : refreshToken 생성
        String refreshToken = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS512")
                .setExpiration(new Date(now + refreshTokenValidityInMilliseconds))
                .setSubject("refresh-token")
                .signWith(signingKey, SignatureAlgorithm.HS512)
                .compact();
        return new AuthDto.TokenDto(accessToken, refreshToken);

    }

    // 재발급 검증 API에서 사용
    public boolean validateAccessTokenOnlyExpired(String accessToken) {
        try {
            return getClaims(accessToken)
                    .getExpiration()
                    .before(new Date());
        } catch (ExpiredJwtException e) { // 유효기간만 만료된 유효한 토큰일 경우 true를 반환한다.
            return true;
        } catch (Exception e) { // 아니라면 FALSE 를 반환한다.
            return false;
        }
    }


}
