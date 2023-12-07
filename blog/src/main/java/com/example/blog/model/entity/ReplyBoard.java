package com.example.blog.model.entity;


import com.example.blog.model.common.BaseTimeEntiry;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "TB_REPLY_BOARD")
@SequenceGenerator(
        name = "SQ_REPLY_BOARD_GENERATOR"
        , sequenceName = "SQ_REPLY_BOARD"
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
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_REPLY_BOARD SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE BID = ?")
public class ReplyBoard extends BaseTimeEntiry {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_REPLY_BOARD_GENERATOR")
    private Integer bid; // 기본키, 시퀀스
    private String boardContent;
    private String boardWriter;
    private Integer viewCnt;
    private Integer boardGroup; // 트리구조 최상위 무모노드(부모있을경우 : 부모번호, 없을경우 자신의 게시판번호)
    private Integer boardParent; // 자신의 부모노트 (부모 있울경우 : 부모번호 없을경우 0)
}












