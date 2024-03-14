import { Item } from "../model/todolist/Item";
import EntityService from "./EntityService";


class TodolistService extends EntityService {

    constructor() {
        super("/items");
    }

    async getAllItems(): Promise<Array<Item>> {
        return this.get<Array<Item>>();
    } 

    async checkItem(id: number) {
        return this.put<void>(`/${id}/check`);
    }
}

export default new TodolistService();