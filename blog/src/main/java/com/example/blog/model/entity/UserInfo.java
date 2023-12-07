package com.example.blog.model.entity;

import com.example.blog.model.common.BaseTimeEntiry;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "TB_USERINFO")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_USERINFO SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE USERID = ?")
public class UserInfo extends BaseTimeEntiry {
//    USERID      STRING NOT NULL
//    CONSTRAINT TB_USERINFO PRIMARY KEY,
//    PASSWORD    STRING,
//    GENDER      STRING,
    @Id
    private String userId;
    private String password;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String refreshToken;

}
