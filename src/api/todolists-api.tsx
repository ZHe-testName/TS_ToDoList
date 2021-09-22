import axios from "axios";

export type ToDoListType = {
    addedDate: string,
    id: string,
    order: number,
    title: string,
};

type ResponceToDoListType = {
    data: {
        item: ToDoListType,
    } | {},
    fieldsErrors: Array<any>,
    messages: Array<any>,
    resultCode: number,
};

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        "API-KEY": "797677fc-71e8-47d3-89ee-972f9e368c32",
    },
});

export const todoListsAPI = {
    getToDoLists() {
        return instance.get<Array<ToDoListType>>("/todo-lists")
                    .then(res => res.data);
    },

    createToDoList(title: string) {
        return instance.post<ResponceToDoListType>("/todo-lists", {title: title})
                    .then(res => res.data.resultCode);
    },    

    deleteToDoLIst(id: string) {
        return instance.delete<ResponceToDoListType>(`/todo-lists/${id}`)
            .then(res => res.data.resultCode);
    },

    updateToDoList(id: string, title: string) {
        return instance.put<ResponceToDoListType>(`/todo-lists/${id}`, {title: title})
                    .then(res => res.config.data);
    },
};