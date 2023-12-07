package com.example.blog.service;

import com.example.blog.model.entity.Post;
import com.example.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    //    title like 검색
    public Page<Post> findAllByTitleContaining(String title, Pageable pageable) {
        Page<Post> postPage
                = postRepository.findAllByTitleContaining(title, pageable);
        return postPage;
    }

    //    writer like 검색
    public Page<Post> findAllByWriterContaining(String writer, Pageable pageable) {
        Page<Post> postPage
                = postRepository.findAllByWriterContaining(writer, pageable);
        return postPage;
    }

    //    상세 조회
    public Optional<Post> findById(int pid) {
        Optional<Post> optionalPost = postRepository.findById(pid);
        return optionalPost;
    }

//    저장 함수

    public Post save(Post post) {
        Post post2 = postRepository.save(post);
        return post2;
    }

    //    삭제 함수
    public boolean removeById(int pid) {
        if (postRepository.existsById(pid)) {
            postRepository.deleteById(pid);
            return true;
        }
        return false;
    }

}
