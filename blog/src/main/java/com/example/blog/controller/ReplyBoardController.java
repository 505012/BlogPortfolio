package com.example.blog.controller;

import com.example.blog.model.dto.ReplyBoardDto;
import com.example.blog.model.entity.ReplyBoard;
import com.example.blog.service.ReplyBoardService;
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
@RequestMapping("/api/normal")
public class ReplyBoardController {

    @Autowired
    ReplyBoardService replyBoardService;

    //    전체 조회(계층형, dto) : like 검색
    @GetMapping("/reply-board")
    public ResponseEntity<Object> selectByConnectByPage(
            @RequestParam(defaultValue = "") String boardTitle,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<ReplyBoardDto> replyBoardDtoPage
                    = replyBoardService
                    .selectByConnectByPage(boardTitle, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("replyBoard", replyBoardDtoPage.getContent()); // 배열
            response.put("currentPage", replyBoardDtoPage.getNumber()); // 현재페이지번호
            response.put("totalItems", replyBoardDtoPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", replyBoardDtoPage.getTotalPages()); // 총페이지수

            if (replyBoardDtoPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //  답변 저장함수
    @PostMapping("/reply")
    public ResponseEntity<Object> create(@RequestBody ReplyBoard replyBoard) {
        try {
            ReplyBoard replyBoard2 = replyBoardService.save(replyBoard);
            return new ResponseEntity<>(replyBoard2, HttpStatus.OK);
        } catch (Exception e) {
            //  DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 게시물 저장
    @PostMapping("/reply-board")
    public ResponseEntity<Object> createBoard(@RequestBody ReplyBoard replyBoard) {
        try {
            int insertCount = replyBoardService.saveBoard(replyBoard);
            return new ResponseEntity<>(insertCount, HttpStatus.OK);
        } catch (Exception e) {
            //  DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    수정 함수
    @PutMapping("/reply-board/{bid}")
    public ResponseEntity<Object> update(
            @PathVariable int bid,
            @RequestBody ReplyBoard replyBoard) {

        try {
            ReplyBoard replyBoard2 = replyBoardService.save(replyBoard); // db 수정
            return new ResponseEntity<>(replyBoard2, HttpStatus.OK);
        } catch (Exception e) {
            //   DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세 조회
    @GetMapping("/reply-board/{bid}")
    public ResponseEntity<Object> findById(@PathVariable int bid) {

        try {
            Optional<ReplyBoard> optionalReplyBoard = replyBoardService.findById(bid);

            if (optionalReplyBoard.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalReplyBoard.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            서버 에러
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    답변만 삭제
    @DeleteMapping("/reply/deletion/{bid}")
    public ResponseEntity<Object> delete(@PathVariable int bid) {

//        프론트엔드 쪽으로 상태정보를 보내줌
        try {
            boolean bSuccess = replyBoardService.removeById(bid);

            if (bSuccess == true) {
//                delete 문이 성공했을 경우
                return new ResponseEntity<>(HttpStatus.OK);
            }
//            delete 실패했을 경우( 0건 삭제가 될경우 )
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    게시물 + 답변 2개이상 삭제
    @DeleteMapping("/reply-board/deletion/{boardGroup}")
    public ResponseEntity<Object> deleteBoard(@PathVariable int boardGroup) {

//        프론트엔드 쪽으로 상태정보를 보내줌
        try {
            boolean bSuccess = replyBoardService.remobeAllByBoardGroup(boardGroup);

            if (bSuccess == true) {
//                delete 문이 성공했을 경우
                return new ResponseEntity<>(HttpStatus.OK);
            }
//            delete 실패했을 경우( 0건 삭제가 될경우 )
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
