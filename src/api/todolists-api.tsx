import axios from "axios";
import { FilterValuesType } from "../AppWithRedux";
import { ServerLoginObjectType } from "../bll/auth-reducer/auth-reducer";
import { ServerTasksType } from "../bll/task-reducer/task-reducer";

export type ToDoListType = {
    addedDate: string,
    id: string,
    order: number,
    title: string,
    filter: FilterValuesType,
};

// type TaskType = {
//     addedDate: string,
//     deadline: null | string,
//     description: null | string,
//     id: string,
//     order: number,
//     priority: number,
//     startDate: null | string,
//     status: number,
//     title: string,
//     todoListId: string,
// };

export type TaskChangeType = {
    addedDate: string,
    deadline: null | string,
    priority: number,
    startDate: null | string,
    status: number,
    title: string,
};

export type TaskResponceType = {
    error: null | string,
    items: Array<ServerTasksType>,
    totalCount: number,
};

export type ResponceToDoListType<D = {}> = {
    data: D,
    fieldsErrors: Array<any>,
    messages: Array<string>,
    resultCode: number,
};

export type ResponceAuthType = {
    resultCode: number,
    messages: [] | string[],
    data?: {
        userId?: number,
    },
};

export type IsMeAuthServerResponceDataType = {
    email: string,
    id: number,
    login: string,
};

const toDoListInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        "API-KEY": "797677fc-71e8-47d3-89ee-972f9e368c32",
    },
});

export const todoListsAPI = {
    getToDoLists() {
        return toDoListInstance.get<Array<ToDoListType>>('/todo-lists')
                            .then(res => res.data);
    },

    createToDoList(title: string) {
        return toDoListInstance.post<ResponceToDoListType<{item: ToDoListType}>>('/todo-lists', {title})
                            .then(res => res.data);
    },    

    deleteToDoLIst(id: string) {
        return toDoListInstance.delete<ResponceToDoListType>(`/todo-lists/${id}`)
                            .then(res => res.data.resultCode);
    },

    updateToDoList(id: string, title: string) {
        return toDoListInstance.put<ResponceToDoListType>(`/todo-lists/${id}`, {title})
                            .then(res => res.config);
    },
};

export const tasksAPI = {
    getTasks(listId: string) {
        return toDoListInstance.get<TaskResponceType>(`/todo-lists/${listId}/tasks`)
                    .then(res => res.data.items);
    },

    createTask(listId: string, title: string) {
        return toDoListInstance.post<ResponceToDoListType<{item: ServerTasksType}>>(`/todo-lists/${listId}/tasks`, {title: title})
                            .then(res => res.data);
    },    

    deleteTask(listId: string, taskId: string) {
        return toDoListInstance.delete<ResponceToDoListType>(`/todo-lists/${listId}/tasks/${taskId}`)
                            .then(res => res.data.resultCode);
    },

    updateTask(listId: string, taskId: string, newTask: TaskChangeType) {
        return toDoListInstance.put<ResponceToDoListType>(`/todo-lists/${listId}/tasks/${taskId}`, newTask)
                            .then(res => res.config.data);
    },
};

export const authAPI = {
    login(formFields: ServerLoginObjectType) {
        return toDoListInstance.post<ResponceToDoListType<{userId?: number}>>('/auth/login', formFields)
                            .then(res => res.data);
    },
    logout() {
        return toDoListInstance.delete<ResponceToDoListType<{userId?: number}>>('/auth/login')
                            .then(res => res.data);
    },
    isMeServerAuth() {
        return toDoListInstance.get<ResponceToDoListType<IsMeAuthServerResponceDataType>>('/auth/me')
                            .then(res => res.data);
    },
};