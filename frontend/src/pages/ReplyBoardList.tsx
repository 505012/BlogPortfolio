// ReplyBoardList.tsx : rfce
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Pagination } from "@mui/material";
import IReplyBoard from "../types/IReplyBoard";
import ReplyBoardService from "../services/ReplyService";
import initMain from "../assets/js/scripts";

function ReplyBoardList() {
  // todo: 변수 정의
  // replyBoard(게시물+답변) 배열 변수
  //   답변글 1개만 달리게 제한
  const [replyBoard, setReplyBoard] = useState<Array<IReplyBoard>>([]);
  // 검색어 변수
  const [searchBoardTitle, setSearchBoardTitle] = useState<string>("");

  const [boardContent, setBoardContent] = useState<string>("");

  const [edition, setEdition] = useState<Boolean>(false);

  // 게시판 등록 내용
  const onChangeBoardContent = (evnet: any) => {
    setBoardContent(evnet.target.value);
  };

  const saveBoard = () => {
    var data = {
      boardContent: boardContent,
      boardWriter: "lilipa",
      viewCnt: 0,
      boardGroup: null, // 입력시 제외
      boardParent: 0,
    };
    ReplyBoardService.createBoard(data)
      .then((response: any) => {
        console.log(response.data);
        retrieveReplyBoard();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // todo: 함수 정의
  useEffect(() => {
    retrieveReplyBoard(); // 전체 조회
    initMain();
  }, [page, pageSize]);

  //   전체조회 함수
  const retrieveReplyBoard = () => {
    ReplyBoardService.getAll(searchBoardTitle, page - 1, pageSize) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { replyBoard, totalPages } = response.data;
        setReplyBoard(replyBoard);
        setCount(totalPages);
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        // 벡엔드 실패시 실행됨
        console.log(e);
      });
  };

  //  검색어 수동 바인딩 함수
  const onChangeSearchBoardTitle = (e: any) => {
    setSearchBoardTitle(e.target.value);
  };

  // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
  //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
    setPage(1); // 현재페이지번호 : 1로 강제설정
  };

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  // ---------------------------------------
  // todo: 답변 변수 정의
  // reply 객체 초기화
  const initialReply = {
    bid: null,
    boardContent: "",
    boardWriter: "",
    viewCnt: 0,
    boardGroup: null,
    boardParent: 0,
  };
  // 답변 글 입력 객체
  const [reply, setReply] = useState(initialReply);
  // reply 버튼 클릭시 상태 저장할 변수 : true/false
  const [replyClicked, setReplyClicked] = useState(false);

  // todo: 답변 함수 정의
  // input 수동 바인딩 함수
  const handleInputChange = (event: any) => {
    const { name, value } = event.target; // 화면값
    setReply({ ...reply, [name]: value }); // 변수저장
    console.log(reply.boardContent);
  };

  // 답변글 생성함수(insert)
  const saveReply = () => {
    // 임시 객체
    let data = {
      boardContent: reply.boardContent,
      boardWriter: reply.boardWriter,
      viewCnt: 0,
      boardGroup: reply.bid,
      boardParent: reply.bid,
    };

    ReplyBoardService.create(data) // 벡엔드 답변글 저장 요청
      .then((response: any) => {
        alert("답변글이 생성되었습니다.");
        // 전체 재조회
        retrieveReplyBoard();
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const saveContent = () => {
    let writer = reply.boardWriter;
    if (reply.boardParent != 0) {
      writer = reply.boardWriter.substr(1);
    }

    let data = {
      bid: reply.bid,
      boardContent: reply.boardContent,
      boardWriter: writer,
      viewCnt: 0,
      boardGroup: reply.boardGroup,
      boardParent: reply.boardParent,
    };

    console.log(data);
    ReplyBoardService.update(data.bid, data)
      .then((response: any) => {
        alert("수정 되었습니다.");
        // 전체 재조회
        retrieveReplyBoard();
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //  게시물 reply 버튼 클릭시 화면에 답변입력창 보이게 하는 함수
  const newReply = (data: any) => {
    // 매개변수 데이터(객체) 수정 : boardContent: "" 수정
    setReply({ ...data, boardContent: "" });
    // 답변 입력창 화면보이기 : replyClicked = true
    setReplyClicked(true);
    setEdition(false);
  };

  //  답변 입력창 숨기기
  const closeReply = () => {
    // 답변 입력창 화면숨기기 : replyClicked = false
    setReplyClicked(false);
    setEdition(false);
  };
  const newContent = (data: any) => {
    setReply(data);
    setEdition(true);
    setReplyClicked(false);
  };

    // 게시물 삭제함수
    const deleteReply = () => {
      ReplyBoardService.remove(reply.bid) // 백엔드로 삭제요청
        .then((response: any) => {
          retrieveReplyBoard();
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };
  
  // 게시물 + 답변글 삭제함수 (그룹번호)
    const deleteReplyBoard = () => {
      ReplyBoardService.removeBoard(reply.boardGroup) // 백엔드로 삭제요청
        .then((response: any) => {
          console.log(response.data);
          retrieveReplyBoard();
          console.log(" 삭제됨");
        })
        .catch((e: Error) => {
          console.log("e");
        });
    };
  return (
    // 여기
    <div>
      {/* search start(검색어 입력창) */}
      <div className="row mb-5 justify-content-center">
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="작성자 검색"
            value={searchBoardTitle}
            onChange={onChangeSearchBoardTitle}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={retrieveReplyBoard}
          >
            Search
          </button>
        </div>
      </div>
      {/* search end */}

      {/* 방명록 입력 시작 */}
      <div className="row mb-5 justify-content-center">
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="내용 입력"
            value={boardContent}
            onChange={onChangeBoardContent}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={saveBoard}
          >
            등록
          </button>
        </div>
      </div>
      {/* 방명록 입력 끝 */}

      {/* page start(페이지 번호) */}
      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
      {/* page end */}

      {/* 게시판(폼1) + 답변글(폼2) */}
      <div className="col-md-12">
        {/* table start(게시판) */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">board Writer</th>
              <th scope="col">board Content</th>
              <th scope="col">view Cnt</th>
              <th scope="col">reply</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {replyBoard &&
              replyBoard.map((data, index) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={index}>
                  <td>{data.boardWriter}</td>
                  <td>{data.boardContent}</td>
                  <td>{data.viewCnt}</td>
                  <td>
                    {/* 클릭 : 아래 답변 폼이 열림 */}
                    {data.boardParent == 0 && (
                      <Link to="#">
                        {/* 리액트 : onClick={함수명} : 매개변수없으면 */}
                        {/* 리액트 : onClick={()=>함수명(매개변수)} : 매개변수있으면 */}
                        <span
                          className="badge bg-warning"
                          onClick={() => newReply(data)}
                        >
                          Reply
                        </span>
                      </Link>
                    )}
                  </td>
                  <td>
                    {/* 클릭 : 상세화면 이동 */}
                    <Link to="#">
                      <span
                        className="badge bg-success"
                        onClick={() => newContent(data)}
                      >
                        Edit
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* table end */}

        {/* reply form start(답변글) */}
        <div>
          {/* 변수명 && 태그 : 변수명 = true 태그가 보이고 */}
          {/* 변수명 && 태그 : 변수명 = false 태그가 안보임 */}
          {replyClicked && (
            <div className="col-md-12 row">
              <div className="col-md-12 row mt-2">
                <label htmlFor="bid" className="col-md-2 col-form-label">
                  bid
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="bid"
                    placeholder={reply.bid || ""}
                    disabled
                    name="bid"
                  />
                </div>
              </div>

              <div className="col-md-12 row mt-2">
                <label
                  htmlFor="boardContent"
                  className="col-md-2 col-form-label"
                >
                  board Content
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="boardContent"
                    required
                    value={reply.boardContent}
                    onChange={handleInputChange}
                    name="boardContent"
                  />
                </div>
              </div>

              <div className="col-md-12 row mt-2">
                <label
                  htmlFor="boardWriter"
                  className="col-md-2 col-form-label"
                >
                  board Writer
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="boardWriter"
                    required
                    value={reply.boardWriter}
                    onChange={handleInputChange}
                    name="boardWriter"
                  />
                </div>
              </div>

              <div className="row px-4 mt-2">
                <button
                  onClick={saveReply}
                  className="btn btn-success mt-3 col-md-5"
                >
                  Submit
                </button>
                <div className="col-md-2"></div>

                <button
                  onClick={closeReply}
                  className="btn btn-danger mt-3 col-md-5"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* 게시글 수정 */}
          {edition && (
            <div className="col-md-12 row">
              <div className="col-md-12 row mt-2">
                <label htmlFor="bid" className="col-md-2 col-form-label">
                  bid
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="bid"
                    placeholder={reply.bid || ""}
                    disabled
                    name="bid"
                  />
                </div>
              </div>

              <div className="col-md-12 row mt-2">
                <label
                  htmlFor="boardContent"
                  className="col-md-2 col-form-label"
                >
                  board Content
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="boardContent"
                    required
                    value={reply.boardContent}
                    onChange={handleInputChange}
                    name="boardContent"
                  />
                </div>
              </div>
              <div className="row px-4 mt-2">
                <button
                  onClick={saveContent}
                  className="btn btn-success mt-3 col-md-5"
                >
                  Submit
                </button>
                <div className="col-md-2"></div>

                {reply.boardParent != 0 ? (
                <button
                  className="btn btn-outline-primary ms-3 col"
                  onClick={deleteReply}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger ms-3 col"
                  onClick={deleteReplyBoard}
                >
                  Delete
                </button>
              )}

                <button
                  onClick={closeReply}
                  className="btn btn-danger mt-3 col-md-5"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        {/* reply form end */}
      </div>
    </div>
  );
}

export default ReplyBoardList;
