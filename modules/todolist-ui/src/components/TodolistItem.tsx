import { FunctionComponent, useEffect, useState } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { Button, Checkbox, Tooltip } from "@mui/material";
import { Colors } from "../utils/Colors";
import '../styles/todolist-item.css';
import { Item } from "../model/todolist/Item";
//import TodolistService from "../services/TodolistService";
import { useTodolistService } from "../services/useTodolistService";

interface TodolistItemProps {
    item: Item;
}

export const TodolistItem: FunctionComponent<TodolistItemProps> = ({item}) => {

    const [content, setContent] = useState<string>(item.content);
    const [isCheck, setIsCheck] = useState<boolean>(item.done);
    const { checkItem } = useTodolistService();

    const onCheck = () => {
        setIsCheck(prev => !prev);
        checkItem(item.id);
    }

    return (
        <div className="item">
            <div className="item-first-part">
                <Checkbox defaultChecked={item.done} onChange={onCheck} sx={{color: Colors.PRIMARY_ORANGE, '&.Mui-checked': {color: Colors.PRIMARY_ORANGE}}}/>                
                <Tooltip title={content} placement="top">
                    <div className="item-content" style={{textDecoration: isCheck ? "line-through" : "none"}}>
                        <TText type={TextType.TEXT}>{content}</TText>
                    </div>
                </Tooltip>
            </div>

            <Button sx={{ textTransform: 'none' }}>Edit</Button>
        </div>
    );
}