import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import IPost from "../types/IPost";
import PostService from "../services/PostService";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import FileDbService from "../services/FileDbService";
import IFileDb from "../types/IFleDb";
import LoginService from "../services/LoinService";
function Post() {
  const accessAdmin = (event: any) => {
    LoginService.findBoardAll()
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        alert("권한이 없습니다.");
        console.log(e);
        console.log("localstorage", localStorage.getItem("accessToken"));
      });
  };

  // 객체 초기화(상세조회 : 기본키 있음)
  const initialFileDb = {
    uuid: null, // 기본키(범용적으로 유일한 값을 만들어주는 값)
    fileTitle: "", // 제목
    fileContent: "", // 내용
    fileUrl: "", // 파일 다운로드 URL
  };

  // uploadFileDb 수정될객체
  const [uploadFileDb, setUploadFileDb] = useState<IFileDb>(initialFileDb);
  // 화면에 수정 성공에 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");
  //   todo: 현재 선택한 파일을 저장할 배열변수
  const [selectedFiles, setSelectedFiles] = useState<FileList>();

  // todo: 함수 정의
  // 상세조회 함수
  const getFileDb = (uuid: string) => {
    FileDbService.getFileDb(uuid) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setUploadFileDb(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 이미지

  const { pid } = useParams();
  let navigate = useNavigate();
  const initalPost = {
    uuid: "",
    pid: null,
    title: "",
    writer: "",
    content: "",
    insertTime: "",
  };
  const [post, setPost] = useState<IPost>(initalPost);
  const getPost = (pid: string) => {
    accessAdmin(localStorage.getItem("accessToken"));
    console.log("콘솔 : ", localStorage.getItem("accessToken"));
    PostService.get(pid)
      .then((response: any) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (pid) {
      getPost(pid);
    }
  }, [pid]);

  const onChangeDelete = () => {
    PostService.remove(post.pid)
      .then((response) => {
        console.log("post.uid야 : ", post.uuid);
        deleteImage(post.uuid);
        console.log(response.data);
        alert("삭제되었습니다.");
        navigate("/");
      })
      .catch((e: Error) => {
        console.log(e);
        alert("삭제되었습니다.");
      });
  };

  //   todo : 삭제버튼 함수
  // 삭제함수(uuid)
  const deleteImage = (uuid: any) => {
    FileDbService.deleteFile(uuid) // 백엔드로 삭제요청
      .then((response: any) => {
        console.log(response.data);
        setMessage("삭제되었습니다.");
        
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰때 실행되는 이벤트 + uuid 값이 바뀌면 실행
  useEffect(() => {
    if (post.uuid) getFileDb(post.uuid);
  }, [post.uuid]);

  return (
    <>
      <div className="" style={{ width: 75 + "vw" }}>
        <h2 className="mb-5" style={{ display: "inline-block" }}>
          {post.title}
        </h2>
        <ul style={{ float: "right", listStyleType: "none" }}>
          <li>
            <Link
              to={"/post-update/" + post.pid}
              style={{ textDecoration: "none" }}
            >
              수정
            </Link>
          </li>
          <li onClick={onChangeDelete}>
            <Link to="#" style={{ textDecoration: "none" }}>
              삭제
            </Link>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              이전
            </Link>
          </li>
        </ul>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(post?.content)),
          }}
        />

        {/* <!-- 이미지내용 입력 박스 끝 --> */}
        {post.uuid == "" ? (
          "s"
        ) : (
          <div className="mb-3 col-md-12">
            <img
              src={uploadFileDb.fileUrl}
              className="card-img-top"
              alt="사진"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
