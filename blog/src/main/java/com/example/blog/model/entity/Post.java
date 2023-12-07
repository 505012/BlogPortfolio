package com.example.blog.model.entity;

import com.example.blog.model.common.BaseTimeEntiry;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "TB_POST")
@SequenceGenerator(
        name = "SQ_TB_POST_GENERATOR"
        , sequenceName = "SQ_TB_POST"
        , initialValue = 1
        , allocationSize = 1
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_POST SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE PID = ?")
public class Post extends BaseTimeEntiry {
    //    pid         number not null primary key,
//    title         varchar2(255),
//    writer       varchar2(255),
//    content
    private String uuid;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_TB_POST_GENERATOR")
    private Integer pid;
    private String title;
    private String writer;
    private String content;
}
