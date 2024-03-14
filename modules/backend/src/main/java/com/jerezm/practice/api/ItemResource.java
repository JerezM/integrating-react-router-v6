package com.jerezm.practice.api;

import com.jerezm.practice.dto.ItemDTO;
import com.jerezm.practice.exception.ItemNotFoundException;
import com.jerezm.practice.service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemResource {
    Logger logger = LoggerFactory.getLogger(ItemResource.class);

    private final ItemService itemService;

    @Autowired
    public ItemResource(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getItems() {
        List<ItemDTO> itemsDTO = itemService.getItems();

        return new ResponseEntity<>(itemsDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO itemDTO) {
        ItemDTO itemDTOCreated = itemService.createItem(itemDTO);
        return new ResponseEntity<>(itemDTOCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Object> updateContentItem(@PathVariable("itemId") Long itemId, @RequestBody ItemDTO itemDTO) {
        try {
            ItemDTO itemDTOUpdated = itemService.updateContentItem(itemId, itemDTO.getContent());
            return new ResponseEntity<>(itemDTOUpdated, HttpStatus.OK);
        } catch (ItemNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>("Error trying to update content from item. Item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{itemId}/check")
    public ResponseEntity<Object> checkItem(@PathVariable("itemId") Long itemId) {
        try {
            ItemDTO itemDTOUpdated = itemService.checkItem(itemId);
            return new ResponseEntity<>(itemDTOUpdated, HttpStatus.OK);
        } catch (ItemNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>("Error trying to check item. Item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Object> deleteItemById(@PathVariable("itemId") Long itemId) {
        try {
            ItemDTO itemDTO = itemService.deleteItemById(itemId);
            return new ResponseEntity<>(itemDTO, HttpStatus.OK);
        } catch (ItemNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>("Error trying to delete item. Item not found.", HttpStatus.NOT_FOUND);
        }
    }
}
