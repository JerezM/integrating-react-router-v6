import { FunctionComponent, useEffect, useState } from "react";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import { Button, Checkbox, TextField, Tooltip } from "@mui/material";
import { Colors } from "../../utils/Colors";
import '../../styles/todolist-item.css';
import { Item } from "../../model/todolist/Item";
import { useTodolistService } from "../../services/useTodolistService";

interface TodolistItemProps {
    item: Item;
    deleteItem: (itemId: number) => void;
}

export const TodolistItem: FunctionComponent<TodolistItemProps> = ({item, deleteItem}) => {

    const [content, setContent] = useState<string>(item.content);
    const [isCheck, setIsCheck] = useState<boolean>(item.done);

    const [editedContent, setEditedContent] = useState<string>(item.content);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { checkItem, editContentItem } = useTodolistService();

    useEffect(() => {
        setEditedContent(content);
    }, [content])

    const onCheck = () => {
        setIsCheck(prev => !prev);
        checkItem(item.id);
    }

    const handleDelete = () => {
        deleteItem(item.id);
    }

    const handleChangeOnEditItemInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedContent(event.target.value);
    };

    const handleEditContent = () => {
        editContentItem(item.id, editedContent).then(itemUpdated => {
            setContent(itemUpdated.content);
            setIsEditing(false);
        }).catch(error => {
            console.error("Failded to edit item: ", error);
        })
    }

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && (editedContent || editedContent.length > 0)) {
            handleEditContent();
        }
        console.log("[DEBUG] event: ", event);
    }

    return (
        <div className="item">
            <div className="item-first-part">
                <Checkbox defaultChecked={item.done} onChange={onCheck} sx={{color: Colors.PRIMARY_ORANGE, '&.Mui-checked': {color: Colors.PRIMARY_ORANGE}}}/>
                {!isEditing
                    ?
                        <Tooltip title={content} placement="top">
                            <div className="item-content" style={{textDecoration: isCheck ? "line-through" : "none"}}>
                                <TText type={TextType.TEXT}>{content}</TText>
                            </div>
                        </Tooltip>
                    :
                        <div className="item-content">
                            <TextField id="add-item-input" type="text" size="small" value={editedContent} onChange={handleChangeOnEditItemInput} onKeyDown={handleKeyPressed}/>                                                       
                        </div>
                }           
                
            </div>

            <div style={{display: 'flex'}}>
                {!isEditing
                    ?
                        <>
                            <Button sx={{ textTransform: 'none' }} onClick={() => setIsEditing(true)}>Edit</Button>
                            <Button sx={{ textTransform: 'none' }} onClick={handleDelete}>Delete</Button>
                        </>
                    :
                        <>
                            <Button sx={{ textTransform: 'none' }} onClick={handleEditContent} disabled={!editedContent || editedContent.length <= 0}>Confirm</Button>
                            <Button sx={{ textTransform: 'none' }} onClick={() => setIsEditing(false)}>Cancel</Button>
                        </>
                }
                
            </div>
        </div>
    );
}