import React, { useEffect, useState } from "react";
import initMain from "../assets/js/scripts";
import PostList from "./PostList";
import { Link, useNavigate } from "react-router-dom";
import ReplyBoardList from "./ReplyBoardList";
import LoginService from "../services/LoinService";
import IUserInfo from "../types/IUserInfo";

function Home() {
  const initalUserInfo = {
    userId: "",
    password: "",
    role: "",
  };
  const [userInfo, setUserInfo] = useState<IUserInfo>(initalUserInfo);
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    LoginService.findUserInfo()
      .then((response: any) => {
        console.log("아이디 : ", response.data.userId);
        setUserId(response.data.userId);
        setUserInfo(response.data);
        console.log(userInfo);
      })
      .catch((e: Error) => {
        console.log("아이디 불러오기 실패");
        console.log(e);
      });
  }, []);


  let navigate = useNavigate();
  const newTab = (url: string) => {
    window.open(url);
  };
  const [logState, setLogState] = useState<Boolean>(false);
  const LogOut = (event: any) => {
    setLogState(false);
    window.location.replace("/");
    localStorage.clear();
  };
  useEffect(() => {
    initMain();
  }, []);

  const accessAdmin = (event: any) => {
    LoginService.findBoardAll()
      .then((response) => {
        console.log(response.data);
        navigate("/add-post");
      })
      .catch((e) => {
        alert("권한이 없습니다.")
        console.log(e);
        console.log("localstorage", localStorage.getItem("accessToken"));
      });
  };
  return (
    <div>
      {/* <!-- Navigation--> */}


      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
        id="sideNav"
      >
        <a className="navbar-brand js-scroll-trigger" href="#page-top">
          <span className="d-block d-lg-none">Clarence Taylor</span>
          <span className="d-none d-lg-block">
            <img
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src={require("../assets/img/dog1.jpg")}
              style={{ width: 1000 + "px" }}
              alt="..."
            />
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#experience">
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#education">
                Education
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#skill">
                Skills
              </a>
            </li>

          </ul>
        </div>
      </nav>
      {/* <!-- Page Content--> */}
      <div className="container-fluid p-0">
        {/* <!-- About--> */}
        <section className="resume-section" id="about">
          <div className="resume-section-content">
            <h1 className="mb-0">
              블로그 &nbsp;&nbsp;&nbsp;
              <span id="typed1" className="text-primary"></span>
            </h1>
            <p className="lead mb-5"></p>
            <div className="social-icons">
              <a className="social-icon" href="#!">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className="social-icon"
                href="#"
                onClick={() => newTab("https://github.com/")}
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                className="social-icon"
                href="#"
                onClick={() => newTab("https://twitter.com/?lang=ko")}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="social-icon"
                href="#"
                onClick={() => newTab("https://www.facebook.com/?locale=ko_KR")}
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {localStorage.getItem("accessToken") ? (
                <Link to="#" onClick={LogOut} style={{fontSize:50, textDecoration: "none"}}>
                  loginOut
                </Link>
              ) : (
                <Link to="login" style={{fontSize:50,  textDecoration: "none"}}>login</Link>
              )}
            </div>
          </div>
        </section>
        <hr className="m-0" />
        {/* <!-- Experience--> */}
        <section className="resume-section" id="experience">
          <div className="resume-section-content">
            <h2 className="mb-5"> 게시글</h2>
            <p className="container">
              <Link
                to="#"
                style={{ textDecoration: "none" }}
                onClick={accessAdmin}
              >
                게시글 생성
              </Link>
            </p>
            <PostList />
          </div>
        </section>
        <hr className="m-0" />
        {/* <!-- Education--> */}
        <section className="resume-section" id="education">
          <div className="resume-section-content">
            <h2 className="mb-5">방명록</h2>
            <ReplyBoardList />
          </div>
        </section>
        <hr className="m-0" />
        {/* <!-- Skills--> */}
      </div>

      {/* <!-- Expertise Start --> */}
      <div className="container-xxl py-6 pb-5" id="skill">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="display-5 mb-5">Skills & Experience</h1>
              <p className="mb-4">실무형 프론트 & 벡엔드 경험을 보유</p>
              <h3 className="mb-4">My Skills</h3>
              <div className="row align-items-center">
                <div className="row g-3 portfolio-container">
                  <div className="col-md-6">
                    <div className="col-lg-3 col-md-6 portfolio-item front">
                      <div className="portfolio-img rounded overflow-hidden">
                        <div className="skill mb-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">HTML & CSS</h6>
                            <h6 className="font-weight-bold">95%</h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              aria-valuenow={95}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 portfolio-item front">
                      <div className="portfolio-img rounded overflow-hidden">
                        <div className="skill mb-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">React & Vue</h6>
                            <h6 className="font-weight-bold">85%</h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              aria-valuenow={85}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 portfolio-item back">
                      <div className="portfolio-img rounded overflow-hidden">
                        <div className="skill mb-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">
                              JSP & Java & Springboot
                            </h6>
                            <h6 className="font-weight-bold">90%</h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-lg-3 col-md-6 portfolio-item back">
                      <div className="portfolio-img rounded overflow-hidden">
                        <div className="skill mb-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">Oracle DB</h6>
                            <h6 className="font-weight-bold">90%</h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 portfolio-item back">
                      <div className="portfolio-img rounded overflow-hidden">
                        <div className="skill mb-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">Docker</h6>
                            <h6 className="font-weight-bold">95%</h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-dark"
                              role="progressbar"
                              aria-valuenow={95}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-lg-3 col-md-6 portfolio-item back">
                      <div className="portfolio-img rounded overflow-hidden">
                        <div className="skill mb-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">
                              AWS & Oracle Cloud
                            </h6>
                            <h6 className="font-weight-bold">85%</h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              aria-valuenow={85}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <ul className="nav nav-pills rounded border border-2 border-primary mb-5">
                <li className="nav-item w-50">
                  <a
                    className="nav-link w-100 py-3 fs-5 active"
                    data-bs-toggle="pill"
                    href="#tab-1"
                  >
                    Experience
                  </a>
                </li>
                <li className="nav-item w-50">
                  <a
                    className="nav-link w-100 py-3 fs-5"
                    data-bs-toggle="pill"
                    href="#tab-2"
                  >
                    Education
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="tab-1" className="tab-pane fade show p-0 active">
                  {/* 소메뉴 시작 */}
                  <div className="row g-3">
                    <div className="col-lg-12 text-center">
                      <ul className="list-inline" id="portfolio-flters">
                        {/* <!-- isotopo 필터 정의 --> */}
                        <li className="mx-3 active mb-3" data-filter="*">
                          <Link to="#" style={{textDecoration: "none"}}>전체</Link>
                        </li>
                        <li className="mx-3 mb-3" data-filter=".front">
                          <Link to="#" style={{textDecoration: "none", color:"blue"}}>프론트앤드</Link>
                        </li>
                        <li className="mx-3 mb-3" data-filter=".back">
                          <Link to="#" style={{textDecoration: "none" , color:"black"}}>벡앤드</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {userId === "1" ?                 <div id="tab-2" className="tab-pane fade show p-0">
                  <div className="row gy-5 gx-4">
                    <div className="col-sm-6">
                      <h5>전공</h5>
                      <hr className="text-primary my-2" />
                      <h6 className="mb-0">멀티미디어학 학사</h6>
                    </div>
                    <div className="col-sm-6">
                      <h5>자격증</h5>
                      <hr className="text-primary my-2" />
                      <h6 className="mb-0">정보처리 기사</h6>
                    </div>


                  </div>
                </div> : ""}

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Expertise End --> */}
      <hr className="m-0" />

    </div>
  );
}

export default Home;
