// axios 공통함수 : 벡엔드 연동
import IPost from "../types/IPost";
import http from "../utils/http-common";

//  전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
// 셀렉트박스 : (question) 입력창 : 질문 like 검색
// 셀렉트박스 : (questioner) 입력창 : 질문자 like 검색
// 변수 : searchSelect(fullName,email)
// 변수 : searchKeyword : 검색어

const getAll = (
  searchSelect: string,
  searchKeyword: string,
  page: number,
  size: number
) => {
  return http.get<Array<IPost>>(
    `/basic/post?searchSelect=${searchSelect}&searchKeyword=${searchKeyword}&page=${page}&size=${size}`
  );
};
// 상세 조회
const get = (pid: any) => {
  return http.get<IPost>(`/basic/post/${pid}`);
};

// 저장 함수
const create = (data: IPost) => {
  return http.post<IPost>("/basic/post", data);
};
// 수정 함수
const update = (pid: any, data: IPost) => {
  return http.put<any>(`/basic/post-update/${pid}`, data);
};
// 삭제 함수
const remove = (pid: any) => {
  return http.delete<any>(`/basic/post/deletion/${pid}`);
};

const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PostService;