package com.example.blog.model.dto;

/**
 * packageName : com.example.simpledms.model.dto.normal
 * fileName : ReplyBoardDto
 * author : GGG
 * date : 2023-10-26
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-26         GGG          최초 생성
 */
public interface ReplyBoardDto {
    //    private String boardTitle;
//    private String boardContent;
//    private String boardWriter;
//    private Integer viewCnt;
//    private Integer boardGroup;
//    private Integer boardParent;
    public Integer getBid();
    public String getBoardContent();
    public String getBoardWriter();
    public Integer getViewCnt();
    public Integer getBoardGroup();
    public Integer getBoardParent();

}

