import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IPost from "../types/IPost";
import PostService from "../services/PostService";
import LoginService from "../services/LoinService";

function PostList() {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    LoginService.findUserInfo()
      .then((response: any) => {
        console.log("아이디 : ", response.data.userId);
        setUserId(response.data.userId);
      })
      .catch((e: Error) => {
        console.log("아이디 불러오기 실패");
        console.log(e);
      });
  }, []);

  // 페이지
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  const pageSizes = [3, 6, 9]; // 공통 pageSizes : 배열 (셀렉트 박스 사용)

  const [post, setPost] = useState<Array<IPost>>([]);
  const [searchSelect, setSearchSelect] = useState<string>("title");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 검색 종류 선택
  const onChangeSearchSelect = (e: any) => {
    setSearchSelect(e.target.value); // 화면값 -> 변수저장
    console.log(searchSelect);
  };
  // 검색할 단어
  const onChangeSearchKeyword = (e: any) => {
    setSearchKeyword(e.target.value);
    console.log(searchKeyword);
  };
  // 페이지 양
  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };
  // 한페이지에 나타나는 양
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  // 실행시 화면 띄움
  useEffect(() => {
    retrievePost();
  }, [page, pageSize]);

  const retrievePost = () => {
    PostService.getAll(searchSelect, searchKeyword, page - 1, pageSize)
      .then((response: any) => {
        const { post, totalPages } = response.data;
        setPost(post);
        setCount(totalPages);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      {/* question start(다양한 검색어 부분) */}
      {/* customer start */}
      <div className="col-md-8 offset-2">
        <div className="col-12 input-group mb-3">
          <div>
            <select
              className="form-select"
              onChange={onChangeSearchSelect}
              value={searchSelect}
            >
              <option key="title" value="title">
                제목
              </option>
              <option key="writer" value="writer">
                작성자
              </option>
            </select>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Question"
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrievePost}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        {/* page control start(페이징 html) */}
        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        {/* page control end */}
        {/* table start(본문) */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">작성자</th>
              <th scope="col">제목</th>
              <th scope="col">작성일</th>
              <th scope="col">게시글 선택</th>
            </tr>
          </thead>
          <tbody>
            {post &&
              post.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.pid}>
                  <td>{data.writer}</td>
                  <td>{data.title}</td>
                  <td>{data.insertTime}</td>

                  <td>
                    {userId === data.writer ? (
                      <Link to={"/post/" + data.pid}>
                        <span className="badge bg-success">Edit</span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="col-md-4 offset-5">
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

        {/* table end */}
      </div>
    </>
  );
}

export default PostList;
