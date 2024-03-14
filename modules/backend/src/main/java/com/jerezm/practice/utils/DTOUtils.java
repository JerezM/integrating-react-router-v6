package com.jerezm.practice.utils;

import com.jerezm.practice.dto.ItemDTO;
import com.jerezm.practice.model.Item;

public class DTOUtils {

    private DTOUtils(){}

    public static ItemDTO toDTO(Item item) {
        return ItemDTO.builder()
            .id(item.getId())
            .content(item.getContent())
            .isDone(item.isDone())
            .createdAt(item.getCreatedAt())
            .build();
    }

    public static Item fromDTO(ItemDTO itemDTO) {
        Item item = new Item();

        item.setId(itemDTO.getId());
        item.setContent(itemDTO.getContent());
        item.setDone(itemDTO.isDone());
        item.setCreatedAt(itemDTO.getCreatedAt());

        return item;
    }
}
