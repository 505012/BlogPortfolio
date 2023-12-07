import React, { useState } from "react";
import IUserInfo from "../../types/IUserInfo";
import LoginService from "../../services/LoinService";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  let initialUser = {
    userId: "",
    password: "",
  };
  const [loginAttr, setLoginAttr] = useState(initialUser);

  let navigate = useNavigate();

  const onChangeUser = (event: any) => {
    const { name, value } = event.target;
    setLoginAttr({ ...loginAttr, [name]: value });
  };

  const onSubmitHandler = (event: any) => {
      event.preventDefault();
    console.log("sd")
    // 버튼만 누르면 리로드 되는것을 막아줌
    LoginService.login(loginAttr)
      .then((response: any) => {
        let headers = response.headers.get("Authorization");
        headers = headers.substr(7);
        localStorage.setItem("accessToken", headers);
        console.log("response.data");
        navigate("/");
      })
      .catch((e: Error) => {
        
        console.log("e");
      });
  };

  return (
    <div className="container text-center">
      <form onSubmit={onSubmitHandler}>
        <div className="row mt-5 text-center">
        <label className="col-4">Id</label>
        <input className="col-4" type="id" name="userId" onChange={onChangeUser} />
        </div>
        <br></br>
        <div className="row text-center" >
        <label className="col-4">Password</label>
        <input className="col-4" type="password" name="password" onChange={onChangeUser} />
        </div>

        <br />
        <button className="" formAction="">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
