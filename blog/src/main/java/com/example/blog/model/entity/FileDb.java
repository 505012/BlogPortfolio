package com.example.blog.model.entity;

import com.example.blog.model.common.BaseTimeEntiry;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.parameters.P;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "TB_FILE_DB")
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
@SQLDelete(sql = "UPDATE TB_FILE_DB SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE UUID = ?")
public class FileDb extends BaseTimeEntiry {

    @Id
    private String uuid; // 기본키
    private String fileTitle;
    private String fileContent;
    private String fileName;
    @Lob
    private byte[] fileData; // 첨부파일(이진파일)
    private String fileUrl; // 파일url
}
