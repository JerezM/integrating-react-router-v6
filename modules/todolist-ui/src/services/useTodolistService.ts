import { Item } from "../model/todolist/Item";
import { CustomRequestProps, useHttpClient } from "./useHttpClient"


export const useTodolistService = () => {
    const { get, post, put, del } = useHttpClient({endpoint: "/items"});

    const getAllItems = async (): Promise<Array<Item>> => {
        return get<Array<Item>>();
    } 

    const addItem = async (content: string): Promise<Item> => {
        const request: CustomRequestProps = {body: {content: content} as Item};
        return post<Item>(request);
    }

    const checkItem = async (id: number) => {
        const request: CustomRequestProps = {endpoint: `/${id}/check`};
        return put<void>(request);
    }

    const editContentItem = async (id: number, editedContent: string): Promise<Item> => {
        const request: CustomRequestProps = 
            {
                body: {content: editedContent} as Item,
                endpoint: `/${id}`, 
            };
        return put<Item>(request);
    }

    const deleteItem = async (id: number) => {
        const request: CustomRequestProps = {endpoint: `/${id}`};
        return del<void>(request);
    }

    return { getAllItems, addItem, checkItem, editContentItem, deleteItem };
}