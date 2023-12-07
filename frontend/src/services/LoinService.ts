// axios 공통함수 : 벡엔드 연동
import IUserInfo from "../types/IUserInfo";
import http from "../utils/http-common";

//  전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
// 셀렉트박스 : (question) 입력창 : 질문 like 검색
// 셀렉트박스 : (questioner) 입력창 : 질문자 like 검색
// 변수 : searchSelect(fullName,email)
// 변수 : searchKeyword : 검색어


const findBoardAll = () => { 
  console.log(`Bearer ${localStorage.getItem('accessToken')}`)
  return http.get('user/board',{
    headers:  {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }})
}

const findUserInfo = () => { 
  console.log(`Bearer ${localStorage.getItem('accessToken')}`)
  return http.get(`user/userInfo/${localStorage.getItem('accessToken')}`,{
    headers:  {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }})
 }


const login = (data:any) => { 
return http.post(`/auth/login`,data);
}

const LoginService = {
  findBoardAll , 
  login,
  findUserInfo
};

export default LoginService;