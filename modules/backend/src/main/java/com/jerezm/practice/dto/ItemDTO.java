package com.jerezm.practice.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemDTO {
    private Long id;
    private String content;
    private boolean isDone;
    private Date createdAt;
}
