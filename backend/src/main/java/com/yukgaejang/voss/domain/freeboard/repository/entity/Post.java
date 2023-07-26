package com.yukgaejang.voss.domain.freeboard.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;
    private String content;
    private Long hit;
    private int isDeleted;
    private LocalDateTime deletedAt;

    public void increaseHit(Long hit) {
        this.hit = hit;
    }

    public void delete(int isDeleted) {
        this.isDeleted = isDeleted;
        this.deletedAt = LocalDateTime.now();
    }

    @Builder
    public Post(String title, String content, Member member) {
        this.title = title;
        this.content = content;
        this.member = member;
        this.hit = 0L;
        this.isDeleted = 0;
    }
}
