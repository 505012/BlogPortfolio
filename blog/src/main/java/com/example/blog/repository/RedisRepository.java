package com.example.blog.repository;


import com.example.blog.model.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.demo.repository
 * fileName : RedisRepository
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
@Repository
public interface RedisRepository extends CrudRepository<RefreshToken, String> {
}
