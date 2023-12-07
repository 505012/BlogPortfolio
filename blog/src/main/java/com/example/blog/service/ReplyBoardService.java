package com.example.blog.service;

import com.example.blog.model.dto.ReplyBoardDto;
import com.example.blog.model.entity.ReplyBoard;
import com.example.blog.repository.ReplyBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReplyBoardService {
    @Autowired
    ReplyBoardRepository replyBoardRepository;

    //    계층형 쿼리 조회(dto) : like 검색
    public Page<ReplyBoardDto> selectByConnectByPage(String boardTitle, Pageable pageable) {
        Page<ReplyBoardDto> page
                = replyBoardRepository.selectByConnectByPage(boardTitle, pageable);
        return page;
    }

    //    답변 저장
    public ReplyBoard save(ReplyBoard replyBoard) {
        ReplyBoard replyBoard2 = replyBoardRepository.save(replyBoard);
        return replyBoard2;
    }

    //    게시물 저장
    public int saveBoard(ReplyBoard replyBoard) {
        int insertCount = replyBoardRepository.insertByBoard(replyBoard);

        return insertCount;
    }

    //    상세조회
    public Optional<ReplyBoard> findById(int bid) {
        Optional<ReplyBoard> optionalReplyBoard = replyBoardRepository.findById(bid);
        return optionalReplyBoard;
    }

    //    답변만 삭제
    //    삭제 함수
    public boolean removeById(int bid) {
        if (replyBoardRepository.existsById(bid)) {
            replyBoardRepository.deleteById(bid);
            return true;
        }
        return false;
    }

    //    게시물 + 답변 2개이상 삭제 그룹번호(boardGroup)삭제
    public boolean remobeAllByBoardGroup(int groupBoard) {
//        deleteCount : 삭제된 건수
        int deleteCount = replyBoardRepository.removeAllByBoardGroup(groupBoard);
        if (deleteCount > 0) {
            return true;
        } else {
            return false;
        }
    }
}
