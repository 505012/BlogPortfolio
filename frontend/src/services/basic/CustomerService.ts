// axios 공통함수 : 벡엔드 연동
import ICustomer from "../../types/basic/ICustomer";
import http from "../../utils/http-common";

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
  return http.get<Array<ICustomer>>(
    `/basic/customer?searchSelect=${searchSelect}&searchKeyword=${searchKeyword}&page=${page}&size=${size}`
  );
};
// 상세 조회
const get = (cid: any) => {
  return http.get<ICustomer>(`/basic/customer/${cid}`);
};

// 저장 함수
const create = (data: ICustomer) => {
  return http.post<ICustomer>("/basic/customer", data);
};
// 수정 함수
const update = (cid: any, data: ICustomer) => {
  return http.put<any>(`/basic/customer/${cid}`, data);
};
// 삭제 함수
const remove = (cid: any) => {
  return http.delete<any>(`/basic/customer/deletion/${cid}`);
};

const CustomerService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CustomerService;