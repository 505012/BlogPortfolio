export default interface ICustomer {
  // CID         NUMBER NOT NULL
  //     CONSTRAINT PK_CUSTOMER PRIMARY KEY,
  // FULL_NAME   VARCHAR2(255),
  // EMAIL       VARCHAR2(255),
  // PHONE       VARCHAR2(255),

  cid?: any | null;
  fullName: string;
  email: string;
  phone: string;
}
