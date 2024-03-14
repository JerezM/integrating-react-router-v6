import { Item } from "../model/todolist/Item";
import { useAuthEntityService } from "./useAuthEntityService"


export const useTodolistService = () => {
    const { get, put } = useAuthEntityService({endpoint: "/items"});

    const getAllItems = async (): Promise<Array<Item>> => {
        return get<Array<Item>>();
    } 

    const checkItem = async (id: number) => {
        return put<void>(`/${id}/check`);
    }

    return { getAllItems, checkItem };
}