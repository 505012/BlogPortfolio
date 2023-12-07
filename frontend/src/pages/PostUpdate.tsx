import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostService from "../services/PostService";
import IPost from "../types/IPost";
import LoginService from "../services/LoinService";
import FileDbService from "../services/FileDbService";
import IFileDb from "../types/IFleDb";
import initMain from "../assets/js/scripts";

function PostUpdate() {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    if (pid) {
      getPost(pid);
    }
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

  const { pid } = useParams();
  const navigater = useNavigate();
  const [content, setContent] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const initalPost = {
    uuid: "",
    pid: null,
    title: "",
    writer: "",
    content: "",
    insertTime: "",
  };
  const [post, setPost] = useState<IPost>(initalPost);

  const handleChangeInputContent = (event: any) => {
    if (event === "ds") {
      setContent("&nbsp;");
      console.log("nbsp");
    } else {
      setContent(event);
    }

    console.log(event);
  };

  const handleChangeInputTitle = (event: any) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleClickSave = () => {
    console.log("수정 uuid : ", uploadFileDb.uuid);
    const data = {
      uuid: uploadFileDb.uuid,
      pid: pid,
      title: title,
      writer: userId,
      content: content,
      insertTime: "",
    };
    PostService.update(pid, data)
      .then((response: any) => {
        console.log(response.data);
        setPost(response.data);
        navigater("/post/" + pid);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getPost = (pid: string) => {
    PostService.get(pid)
      .then((response: any) => {
        setPost(response.data);
        setContent(response.data.content);
        setTitle(response.data.title);
        getFileDb(response.data.uuid);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const modules = {
    toolbar: {
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };

  // 이미지

  const initialFileDb = {
    uuid: null, // 기본키(범용적으로 유일한 값을 만들어주는 값)
    fileTitle: "", // 제목
    fileContent: "", // 내용
    fileUrl: "", // 파일 다운로드 URL
  };

  // uploadFileDb 객체
  const [uploadFileDb, setUploadFileDb] = useState<IFileDb>(initialFileDb);
  // todo: 화면에 성공/실패 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");
  //   todo: 현재 선택한 파일을 저장할 배열변수
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [uuid, setUuid] = useState<string>(uploadFileDb.uuid);
  // todo: 함수 정의

  // todo: input 태그에 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면값
    setUploadFileDb({ ...uploadFileDb, [name]: value }); // 변수저장
  };

  // 저장 함수
  const upload = () => {
    console.log("dasdas", uploadFileDb.uuid);
    console.log("dasdas", uploadFileDb);
    // 선택된 이미지 파일 배열변수 : selectedFiles
    // 변수명? => 옵셔널체이닝 , 변수의 값이 null 이면 undefined 바꾸어줌
    let currentFile = selectedFiles?.[0]; // 1st 선택된 파일
    FileDbService.updateFileDb(uploadFileDb, currentFile) // 저장 요청
      .then((response: any) => {
        console.log("uuid uuid uuidsds : ", console.log(response.data.uuid));
        setMessage("성공했습니다.");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  // 저장 함수
  const uploadNew = () => {
    // 선택된 이미지 파일 배열변수 : selectedFiles
    // 변수명? => 옵셔널체이닝 , 변수의 값이 null 이면 undefined 바꾸어줌
    let currentFile = selectedFiles?.[0]; // 1st 선택된 파일 
    let initialFileDb = {
      uuid: "", // 기본키(범용적으로 유일한 값을 만들어주는 값)
      fileTitle: uploadFileDb.fileTitle, // 제목
      fileContent: uploadFileDb.fileContent, // 내용
      fileUrl: uploadFileDb.fileUrl, // 파일 다운로드 URL
    };
    FileDbService.upload(uploadFileDb, currentFile) // 저장 요청
    .then((response: any) => {
        console.log("upuuid", uploadFileDb.uuid);
        initialFileDb.uuid = response.data;
        setUploadFileDb(initialFileDb);
        post.uuid = uploadFileDb.uuid;
        console.log("post.uuid uuiddasdsadas : ", post.uuid);
        setMessage("성공했습니다.");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log("이미지없음");
      });
  };
  useEffect(() => {
    initMain();
    console.log("post.uuid ", post.uuid);
    if (post.uuid) {
      getFileDb(post.uuid);
    }
  }, [pid]);

  const getFileDb = (uuid: string) => {
    FileDbService.getFileDb(uuid)
      .then((response: any) => {
        setSelectedFiles(response.data);
        setUploadFileDb(response.data);
        console.log("이미지파일 불러오는 데이터", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   todo: 파일 선택상자에서 이미지 선택시 실행되는 함수
  // 파일 선택상자 html 태그 : <input type="file" />
  const selectFile = (event: any) => {
    // 화면에서 이미지 선택시 저장된 객체 : event.target.files
    // 변수명 as 타입 : 개발자가 변수가 무조건 특정 타입이라고 보증함
    //                 (타입스크립트에서 체크 안함)
    setSelectedFiles(event.target.files as FileList);
  };

  // 이미지
  //   todo : 삭제버튼 함수
  // 삭제함수(uuid)
  const deleteImage = (uuid: any) => {
    FileDbService.deleteFile(uuid) // 백엔드로 삭제요청
      .then((response: any) => {
        setUploadFileDb(initialFileDb);
        console.log(response.data);
        setMessage("삭제되었습니다.");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="container mt-5 mb-2 row">
        <h2 className="container text-center">
          <input
            className="text-center offset-1"
            placeholder=" 제목 입력"
            style={{ width: 45 + "vw" }}
            onChange={handleChangeInputTitle}
            value={title}
          />
        </h2>
        <div className="container col-md-12 mb-5">
          <ReactQuill
            className="mt-5 container offset-2"
            style={{ width: 50 + "vw", height: 50 + "vh" }}
            modules={modules}
            onChange={handleChangeInputContent}
            value={content}
          />
        </div>

        {/* 이미지 */}
        <div className="col-6 mx-auto">
          {/* <!-- 이미지명(fileTitle) 입력 박스 시작 --> */}
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3">
              <label htmlFor="fileTitle" className="form-label">
                이미지명
              </label>
            </div>

            <div className="col-9">
              <input
                type="text"
                className="form-control"
                id="fileTitle"
                required
                name="fileTitle"
                value={uploadFileDb.fileTitle}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <!-- 이미지명 입력 박스 끝 --> */}

          {/* <!-- 이미지내용 입력 박스 시작 --> */}
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3">
              <label htmlFor="fileContent" className="form-label">
                내용
              </label>
            </div>

            <div className="col-9">
              <input
                type="text"
                className="form-control"
                id="fileContent"
                required
                name="fileContent"
                value={uploadFileDb.fileContent}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <!-- 이미지내용 입력 박스 끝 --> */}

          <div className="input-group mb-3">
            {/* upload 선택상자/버튼 start */}
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              onChange={selectFile}
            />
            {uploadFileDb.uuid == null ? (
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                disabled={!selectedFiles}
                onClick={uploadNew}
              >
                UploadNew
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                disabled={!selectedFiles}
                onClick={upload}
              >
                Upload
              </button>
            )}
          </div>
          {/* upload 선택상자/버튼 end */}

          {/* upload 성공/실패 메세지 출력 시작 */}
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          {/* upload 성공/실패 메세지 출력 끝 */}
        </div>

        {/* upload 선택상자/버튼 end */}
        <div className="contaier text-center mt-5">
          <span className="ds badge bg-success" style={{ fontSize: 15 + "px" }}>
            <Link
              to="#"
              style={{ textDecoration: "none", color: "white" }}
              onClick={handleClickSave}
            >
              저장
            </Link>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="badge bg-warning" style={{ fontSize: 15 + "px" }}>
            <Link
              to="#"
              onClick={() => deleteImage(post.uuid)}
              style={{ textDecoration: "none", color: "white" }}
            >
              이미지 삭제
            </Link>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="badge bg-danger" style={{ fontSize: 15 + "px" }}>
            <Link
              to={"/post/" + pid}
              style={{ textDecoration: "none", color: "white" }}
            >
              취소
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostUpdate;
