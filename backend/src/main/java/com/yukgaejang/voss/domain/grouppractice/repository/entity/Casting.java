package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Casting extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Script script;

    private String name;

    public Casting(Script script, String name) {
        this.script = script;
        this.name = name;
    }
}
