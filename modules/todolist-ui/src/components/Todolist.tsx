import { FunctionComponent, useEffect, useState } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { TodolistItem } from "./TodolistItem";
import '../styles/todolist.css';
//import TodolistService from "../services/TodolistService";
import { Item } from "../model/todolist/Item";
import { useTodolistService } from "../services/useTodolistService";

interface TodolistProps {}

export const Todolist: FunctionComponent<TodolistProps> = () => {

    const [items, setItems] = useState<Array<Item>>([]);
    const [itemToAddContent, setItemToAddContent] = useState<string>("");
    const { getAllItems } = useTodolistService();

    useEffect(() => {
        getAllItems()
            .then(items => setItems(items));
    },[]);

    const handleChangeOnAddItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAddContent(event.target.value);
    };

    return (
        <div className="todolist">
            <div className="title">
                <TText type={TextType.HEADER2}>To-Do List</TText>
            </div>
            <div className="list">
                {items.map(item => 
                    <TodolistItem key={item.id} item={item} />    
                )}                
            </div>
            <div className="add-item">
                <input className="add-item-input" type="text" placeholder="New Task" value={itemToAddContent} onChange={handleChangeOnAddItem}/>
                <button>Add</button>
            </div>
        </div>
    );
}