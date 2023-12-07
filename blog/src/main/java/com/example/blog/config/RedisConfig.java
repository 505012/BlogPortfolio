package com.example.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

import java.time.Duration;

@Configuration
@EnableRedisRepositories
public class RedisConfig {
//  Redis IP
  @Value("${redis.host}")
  private String redisHost;

//  Redis Port Number
  @Value("${redis.port}")
  private int redisPort;

//  레디스 연결
  @Bean
  public LettuceConnectionFactory redisConnectionFactory() {
    RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration(redisHost, redisPort);

    System.out.println("레디스 연결됨");
    return new LettuceConnectionFactory(configuration);
  }

//  레디스 관리  :  1) 생성 dept          : ttl - 1 minute
//
  @Bean
  public RedisCacheManager cacheManager() {
//    Redis 캐시 설정 함수를 호출해서 래디스 설정
    RedisCacheConfiguration cacheConfig = myDefaultCacheConfig(Duration.ofMinutes(10))
                                          .disableCachingNullValues(); // 캐싱할 때 null 값을 허용하지 않음

    return RedisCacheManager.builder(redisConnectionFactory())
        .cacheDefaults(cacheConfig)
        .withCacheConfiguration("board", myDefaultCacheConfig(Duration.ofMinutes(1)))   // board 캐쉬 생성
        .build();
  }

//  Redis 캐시 설정 함수 : 1) 설정 default config 2) 설정 ttl 3) 설정 serialize
  private RedisCacheConfiguration myDefaultCacheConfig(Duration duration) {
    return RedisCacheConfiguration
        .defaultCacheConfig()
        .entryTtl(duration)         // ttl(만료시간) 설정
        .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())); // Value 를 직렬화할 때 사용하는 규칙. Jackson2 를 많이 사용함
  }
}












