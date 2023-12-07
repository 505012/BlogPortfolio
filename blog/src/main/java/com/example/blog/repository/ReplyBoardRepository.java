package com.example.blog.repository;

import com.example.blog.model.dto.ReplyBoardDto;
import com.example.blog.model.entity.ReplyBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.transaction.TransactionScoped;
import java.beans.Transient;

@Repository
public interface ReplyBoardRepository extends JpaRepository<ReplyBoard, Integer> {
    //    계층형 조회 쿼리 @Query
    @Query(value = "SELECT BID           AS bid " +
            "     , LPAD('⤵', (LEVEL-1))|| board_writer  AS boardWriter " +
            "     , board_content AS boardContent " +
            "     , view_cnt      AS viewCnt " +
            "     , board_group   AS boardGroup " +
            "     , board_parent  AS boardParent " +
            "FROM TB_REPLY_BOARD " +
            "WHERE BOARD_WRITER LIKE '%'|| :boardTitle ||'%' " +
            "AND   DELETE_YN = 'N' " +
            "START WITH BOARD_PARENT = 0    " +
            "CONNECT BY PRIOR BID = BOARD_PARENT  " +
            "ORDER SIBLINGS BY BOARD_GROUP DESC", nativeQuery = true)
    Page<ReplyBoardDto> selectByConnectByPage(
            @Param("boardTitle") String boardTitle,
            Pageable pageable);


    // 게시물 저장 함수 : 최초 생성(board_group(그룹번호)), board_parent(부모번호)
//     => board_group(부모번호 == 자식번호(bid) board_parent(0(최초생성),부모번호)
//     todo : JPA insert 문 짖접 작성( dml : 테이블 데이터 변경, 트랜잭션을 동반)
//      ==> @Transactional, @Modiying
//       예) 변수 전달 - :#{#replyBoard.boardTitle}
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO TB_REPLY_BOARD " +
            "VALUES(sq_reply_board.nextval,:#{#replyBoard.boardContent},:#{#replyBoard.boardWriter},0,sq_reply_board.CURRVAL,0,'N',TO_CHAR(SYSDATE,'YYYY-MM-DD HH:MI:SS'),NULL,NULL) "
            , nativeQuery = true)
    int insertByBoard(@Param("replyBoard") ReplyBoard replyBoard);


// 게시물 + 답변글 2개 삭제 함수 : 소프트 삭제(update 문 직접 작성)

    @Transactional
    @Modifying
    @Query(value = "UPDATE TB_REPLY_BOARD " +
            "SET DELETE_YN = 'Y',DELETE_TIME = TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') " +
            "WHERE BOARD_GROUP = :boardGroup", nativeQuery = true)
    int removeAllByBoardGroup(@Param("boardGroup") int boardGroup);
}
