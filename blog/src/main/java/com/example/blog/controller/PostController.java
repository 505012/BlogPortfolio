package com.example.blog.controller;

import com.example.blog.model.entity.Post;
import com.example.blog.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/basic")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/post")
    public ResponseEntity<Object> findAllByContaining(
            @RequestParam(defaultValue = "title") String searchSelect,
            @RequestParam(defaultValue = "") String searchKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Post> postPage;
            if (searchSelect.equals("title")) {
                postPage = postService.findAllByTitleContaining(searchKeyword, pageable);
            } else {
                postPage = postService.findAllByWriterContaining(searchKeyword, pageable);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("post", postPage.getContent());
            response.put("currentPage", postPage.getNumber());
            response.put("totalItems", postPage.getTotalElements());
            response.put("totalPages", postPage.getTotalPages());
            if (postPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세 조회
    @GetMapping("/post/{pid}")
    public ResponseEntity<Object> findById(@PathVariable int pid) {
        try {
            Optional<Post> optionalPost = postService.findById(pid);
            if (optionalPost.isEmpty() == false) {
                return new ResponseEntity<>(optionalPost, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    저장 함수
    @PostMapping("/post")
    public ResponseEntity<Object> create(@RequestBody Post post) {
        try {
            Post post2 = postService.save(post);
            return new ResponseEntity<>(post2, HttpStatus.OK);
            
        } catch (Exception e) {
            System.out.println("실패ㅇㅁㄴㅇㄴㅁ");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    수정 함수
    @PutMapping("/post-update/{pid}")
    public ResponseEntity<Object> update(@PathVariable int pid, @RequestBody Post post) {
        try {
            Post post2 = postService.save(post);
            return new ResponseEntity<>(post2, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    삭제 함수
    @DeleteMapping("/post/deletion/{pid}")
    public ResponseEntity<Object> delete(@PathVariable int pid) {

        try {
            boolean bSuccess = postService.removeById(pid);
            if (bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
