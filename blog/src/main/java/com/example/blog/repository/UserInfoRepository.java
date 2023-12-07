package com.example.blog.repository;

import com.example.blog.model.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo,String> {

    public Optional<UserInfo> findByUserId(String id);
}
