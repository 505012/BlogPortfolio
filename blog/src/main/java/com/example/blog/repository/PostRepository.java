package com.example.blog.repository;

import com.example.blog.model.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    //    title  like  검색
    Page<Post> findAllByTitleContaining(String title, Pageable pageable);

    //    writer like 검색
    Page<Post> findAllByWriterContaining(String writer, Pageable pageable);
}
