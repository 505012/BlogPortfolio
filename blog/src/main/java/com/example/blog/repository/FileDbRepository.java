package com.example.blog.repository;


import com.example.blog.model.entity.FileDb;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.advanced
 * fileName : FileDbRepository
 * author : GGG
 * date : 2023-11-10
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-10         GGG          최초 생성
 */
@Repository
public interface FileDbRepository extends JpaRepository<FileDb, String> {
    //    like 검색
    Page<FileDb> findAllByFileTitleContaining(String fileTitle, Pageable pageable);
}