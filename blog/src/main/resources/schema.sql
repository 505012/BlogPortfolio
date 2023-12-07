-- Table , 시퀀스 등 구조 정의

DROP SEQUENCE SQ_POST;
DROP TABLE TB_POST CASCADE CONSTRAINT;
CREATE SEQUENCE SQ_POST START WITH 1 INCREMENT BY 1;



DROP TABLE TB_REPLY_BOARD CASCADE CONSTRAINT;
DROP SEQUENCE SQ_REPLY_BOARD;
CREATE SEQUENCE SQ_REPLY_BOARD INCREMENT BY 1 START WITH 1;

DROP TABLE TB_USERINFO CASCADE CONSTRAINT;


-- 공통코드 테이블은 시퀀스는 사용하지 않음
-- 공통코드 테이블의 등록된 코드는 향후에 않쓰이더라도 삭제/수정하지 않음 : 데이터가 많지않아 오버헤드가 없음

-- 게시판 테이블
CREATE TABLE TB_POST
(
    UUID        VARCHAR2(255),
    PID         NUMBER NOT NULL PRIMARY KEY,
    TITLE       VARCHAR2(255),
    WRITER      VARCHAR2(255),
    CONTENT     VARCHAR2(233),
    DELETE_YN   VARCHAR2(1) DEFAULT 'N',
    INSERT_TIME VARCHAR2(255),
    UPDATE_TIME VARCHAR2(255),
    DELETE_TIME VARCHAR2(255)
);


-- 답변형 게시판
CREATE TABLE TB_REPLY_BOARD
(
    BID           NUMBER NOT NULL
        CONSTRAINT PK_REPLY_BOARD PRIMARY KEY, -- 게시판번호
    BOARD_CONTENT VARCHAR2(255),               -- 내용
    BOARD_WRITER  VARCHAR2(255),               -- 작성자
    VIEW_CNT      NUMBER DEFAULT 0,            -- 조회수
    BOARD_GROUP   NUMBER,                      -- 트리구조 최상위 부모 노드( 부모가 있을 경우 : 부모번호, 없을 경우 : 자신의 게시판번호 )
    BOARD_PARENT  NUMBER,                      -- 자신의 부모 노드 ( 부모가 있을 경우 : 부모번호, 없을 경우 : 0 )
    DELETE_YN     VARCHAR2(1) DEFAULT 'N',
    INSERT_TIME   VARCHAR2(255),
    UPDATE_TIME   VARCHAR2(255),
    DELETE_TIME   VARCHAR2(255)
);

CREATE TABLE TB_USERINFO
(
    USER_ID      VARCHAR2(255) NOT NULL
        CONSTRAINT PK_USERINFO PRIMARY KEY,
    PASSWORD    VARCHAR2(255),
    EMAIL         VARCHAR2(300) UNIQUE,
    ROLE          VARCHAR2(20),
    REFRESH_TOKEN VARCHAR2(500),
    DELETE_YN   VARCHAR2(1) DEFAULT 'N',
    INSERT_TIME VARCHAR2(255),
    UPDATE_TIME VARCHAR2(255),
    DELETE_TIME VARCHAR2(255)
);

CREATE TABLE TB_FILE_DB
(
    UUID         VARCHAR2(1000) NOT NULL
        CONSTRAINT PK_FILE_DB PRIMARY KEY, -- 파일 UUID
    FILE_TITLE   VARCHAR2(1000),           -- 제목
    FILE_CONTENT VARCHAR2(1000),           -- 내용
    FILE_NAME    VARCHAR2(1000),           -- 파일명
    FILE_DATA    BLOB,                     -- 바이너리 파일(이미지파일)
    FILE_URL     VARCHAR2(1000),           -- 파일 다운로드 URL
    DELETE_YN    VARCHAR2(1) DEFAULT 'N',
    INSERT_TIME  VARCHAR2(255),
    UPDATE_TIME  VARCHAR2(255),
    DELETE_TIME  VARCHAR2(255)
);