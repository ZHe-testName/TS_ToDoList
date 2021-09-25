import axios from "axios";

export type ToDoListType = {
    addedDate: string,
    id: string,
    order: number,
    title: string,
};

type TaskType = {
    addedDate: string,
    deadline: null | string,
    description: null | string,
    id: string,
    order: number,
    priority: number,
    startDate: null | string,
    status: number,
    title: string,
};

type TaskChangeType = {
    addedDate: string,
    deadline: null | string,
    priority: number,
    startDate: null | string,
    status: number,
    title: string,
} | null;

export type TaskResponceType = {
    error: null | string,
    items: Array<TaskType>,
    totalCount: number,
};

type ResponceToDoListType<D = {}> = {
    data: D,
    fieldsErrors: Array<any>,
    messages: Array<any>,
    resultCode: number,
};

const toDoListInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    headers: {
        "API-KEY": "797677fc-71e8-47d3-89ee-972f9e368c32",
    },
});

export const todoListsAPI = {
    getToDoLists() {
        return toDoListInstance.get<Array<ToDoListType>>('')
                            .then(res => res.data);
    },

    createToDoList(title: string) {
        return toDoListInstance.post<ResponceToDoListType<{item: ToDoListType}>>('', {title: title})
                            .then(res => res.data.resultCode);
    },    

    deleteToDoLIst(id: string) {
        return toDoListInstance.delete<ResponceToDoListType>(`/${id}`)
                            .then(res => res.data.resultCode);
    },

    updateToDoList(id: string, title: string) {
        return toDoListInstance.put<ResponceToDoListType>(`/${id}`, {title: title})
                            .then(res => res.config.data);
    },

    getTasks(listId: string) {
        return toDoListInstance.get<Array<ToDoListType>>(`/${listId}/tasks`)
                    .then(res => res.data);
    },

    createTask(listId: string, title: string) {
        return toDoListInstance.post<ResponceToDoListType<{item: ToDoListType}>>(`${listId}/tasks`, {title: title})
                            .then(res => res.data.resultCode);
    },    

    deleteTask(listId: string, taskId: string) {
        return toDoListInstance.delete<ResponceToDoListType>(`/${listId}/tasks/${taskId}`)
                            .then(res => res.data.resultCode);
    },

    updateTask(listId: string, taskId: string, newTask: TaskChangeType) {
        return toDoListInstance.put<ResponceToDoListType>(`/${listId}/tasks/${taskId}`, newTask)
                            .then(res => res.config.data);
    },
};