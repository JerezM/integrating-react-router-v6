import { FunctionComponent, useEffect, useState } from "react";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import { TodolistItem } from "./TodolistItem";
import '../../styles/todolist.css';
import { Item } from "../../model/todolist/Item";
import { useTodolistService } from "../../services/useTodolistService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface TodolistProps {}

export const Todolist: FunctionComponent<TodolistProps> = () => {

    const [items, setItems] = useState<Array<Item>>([]);
    const [itemToAddContent, setItemToAddContent] = useState<string>("");
    const { getAllItems, addItem, deleteItem } = useTodolistService();

    useEffect(() => {
        getAllItems()
            .then(items => setItems(items));
    },[]);

    const handleChangeOnAddItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAddContent(event.target.value);
    };

    const handleAddItem = () => {
        addItem(itemToAddContent).then((item) => {
            setItems(currentItems => currentItems.concat([item]));
            setItemToAddContent("");
        }).catch(error => {
            console.error("Failded to add new item: ", error);
        })
    }

    const handleDeleteItem = (itemId: number) => {
        deleteItem(itemId).then(() => {
            setItems(currentItems => currentItems.filter(item => item.id !== itemId));
        }).catch(error => {
            console.error("Failded to delete item: ", error);
        });
    }

    return (
        <div className="todolist">
            <div className="title">
                <TText type={TextType.HEADER2}>To-Do List</TText>
            </div>
            <div className="list">
                {items.map(item => 
                    <TodolistItem key={item.id} item={item} deleteItem={handleDeleteItem}/>    
                )}                
            </div>
            <div className="add-item">
                <TextField id="add-item-input" type="text" placeholder="New Task" size="small" value={itemToAddContent} onChange={handleChangeOnAddItem}/>
                <Button sx={{ textTransform: 'none' }} onClick={handleAddItem} disabled={!itemToAddContent || itemToAddContent.length <= 0}>Add</Button>
            </div>
        </div>
    );
}