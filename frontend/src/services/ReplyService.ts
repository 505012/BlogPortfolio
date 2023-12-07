// ReplyBoardService.ts : axios 공통 crud 함수

import IReplyBoard from '../types/IReplyBoard';
import http from '../utils/http-common';

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (boardTitle:string, page:number, size:number) => {
    return http.get<Array<IReplyBoard>>(`/normal/reply-board?boardTitle=${boardTitle}&page=${page}&size=${size}`);
  };
  
  // 상세 조회
  const get = (bid:any) => {
    return http.get<IReplyBoard>(`/normal/reply-board/${bid}`);
  };
  
  // 저장함수 : 게시물 생성(부모글)
  const createBoard = (data:IReplyBoard) => {
    return http.post<IReplyBoard>("/normal/reply-board", data);
  };  

  // 저장함수 : 답변글 생성(자식글)
  const create = (data:IReplyBoard) => {
    return http.post<IReplyBoard>("/normal/reply", data);
  };

  // 수정함수
  const update = (bid:any, data:IReplyBoard) => {
    return http.put<any>(`/normal/reply-board/${bid}`, data);
  };

  // 삭제함수 : 게시물(부모글) + 답변글(자식글) 모두 삭제
//      그룹번호 : 부모글과 자식글은 모두 그룹번호가 같음
  const removeBoard = (boardGroup:any) => {
    return http.delete<any>(`/normal/reply-board/deletion/${boardGroup}`);
  };

  // 삭제함수 : 답변글만 삭제
  const remove = (bid:any) => {
    return http.delete<any>(`/normal/reply/deletion/${bid}`);
  };
  
  const ReplyBoardService = {
    getAll,
    get,
    createBoard,
    create,
    update,
    removeBoard,
    remove,
  };
  
  export default ReplyBoardService;
  