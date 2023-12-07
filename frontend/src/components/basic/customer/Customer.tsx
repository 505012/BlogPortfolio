import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { useNavigate, useParams } from "react-router-dom";
import ICustomer from "../../../types/basic/ICustomer";
import CustomerService from "../../../services/basic/CustomerService";

function Customer() {
  // 변수 정의
  // 전체조회 페이지에서 전송한 기본키(cid)
  const { cid } = useParams();
  // 강제페이지 이동 함수
  let navigate = useNavigate();

  const initialQna = {
    cid: "",
    fullName: "",
    email: "",
    phone: "",
  };
  // 수정될 객체
  const [customer, setCustomer] = useState<ICustomer>(initialQna);
  // 화면에 수정 성공에 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");

  //   todo : 함수

  // 상세조회 함수
  const getQna = (cid: string) => {
    CustomerService.get(cid) // 백엔드로 상세조회 요청
      .then((response: any) => {
        setCustomer(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰때 실행되는 이벤트 + cid 값이 바뀌면 실행
  useEffect(() => {
    if (cid) getQna(cid);
  }, [cid]);

  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  // 수정함수
  const updateCnstomer = () => {
    CustomerService.update(customer.cid, customer)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The customer was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  // 삭제함수
  const deleteCustomer = () => {
    CustomerService.remove(customer.cid) // 백엔드로 삭제요청
      .then((response: any) => {
        console.log(response.data);
        // 페이지 이동
        navigate("/customer");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      <>
        {customer ? (
          <div className="col-6 mx-auto">
            <form>
              {/* fullName 입력창 시작 */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="fullName" className="col-form-label">
                    FullName
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="fullName"
                    required
                    className="form-control"
                    value={customer.fullName}
                    onChange={handleInputChange}
                    placeholder="fullName"
                    name="fullName"
                  />
                </div>
              </div>
              {/* fullName 입력창 끝 */}

              {/* email 입력창 시작 */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="email" className="col-form-label">
                    Email
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="email"
                    required
                    className="form-control"
                    value={customer.email}
                    onChange={handleInputChange}
                    placeholder="email"
                    name="email"
                  />
                </div>
              </div>
              {/* email 입력창 끝 */}

              {/* phone 입력창 시작 */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="phone" className="col-form-label">
                    Phone
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="phone"
                    required
                    className="form-control"
                    value={customer.phone}
                    onChange={handleInputChange}
                    placeholder="phone"
                    name="phone"
                  />
                </div>
              </div>
              {/* phone 입력창 끝 */}
            </form>

            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={deleteCustomer}
                className="btn btn-outline-danger ms-3 col"
              >
                Delete
              </button>

              <button
                type="submit"
                onClick={updateCnstomer}
                className="btn btn-outline-success ms-2 col"
              >
                Update
              </button>
            </div>

            {message && (
              <p className="alert alert-success mt-3 text-center">{message}</p>
            )}
          </div>
        ) : (
          <div className="col-6 mx-auto">
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </>
    </>
  );
}

export default Customer;
