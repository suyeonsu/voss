package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MyCommentListResponse {
    private Long postId;
    private String postTitle;
    private Long commentId;
    private String commentContent;
    private LocalDateTime commentCreatedAt;

    public MyCommentListResponse(Post post, PostComment postComment) {
        this.postId = post.getId();
        this.postTitle = post.getTitle();
        this.commentId = postComment.getId();
        this.commentContent = postComment.getContent();
        this.commentCreatedAt = postComment.getCreatedAt();
    }
}
