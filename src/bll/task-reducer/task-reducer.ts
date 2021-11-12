import { TasksObjPropsType, TasksType } from './../../AppWithRedux';
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType } from './../todolist-reducer/todolist-reducer';
import { v1 } from 'uuid';      

export const ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_STATUS = 'CHANGE_STATUS',
    CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION',
    ADD_TODOLIST = 'ADD_TODOLIST',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    SET_TODOLISTS = 'SET_TODOLISTS',
    SET_TASKS = 'SET_TASKS'; 

export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    toDoListId: string,
};

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    toDoListId: string,
    taskId: string,
};

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_STATUS',
    toDoListId: string,
    taskId: string,
    isDone: boolean,
};

export type ChangeTaskDescriptionActionType = {
    type: 'CHANGE_TASK_DESCRIPTION',
    toDoListId: string,
    taskId: string,
    newDescription: string,
};

type ActionType = 
                ReturnType<typeof addTaskAC>
                | ReturnType<typeof removeTaskAC>
                | ReturnType<typeof changeTaskStatusAC>
                | ReturnType<typeof changeTaskDescriptionAC>
                | ReturnType<typeof setTasksAC>
                | AddTodoListActionType 
                | RemoveTodoListActionType 
                | SetTodoListsActionType;

const initialState: TasksObjPropsType = {}; 

export const taskReducer = (state: TasksObjPropsType = initialState, action: ActionType):TasksObjPropsType => {
    switch (action.type){
        case ADD_TASK:
            const newTask = {
                id: v1(), 
                title: action.title, 
                isDone: false
            };

            const newList = [...state[action.toDoListId]];

            newList.unshift(newTask);

            return (
                {
                    ...state,
                    [action.toDoListId]: newList,
                }
            );

        case REMOVE_TASK:
            const targetList = state[action.toDoListId];

            const resultList = targetList.filter(task => task.id !== action.taskId);

            return (
                {
                    ...state,
                    [action.toDoListId]: resultList,
                }
            );

            
        case CHANGE_STATUS:
            const listCopy = [...state[action.toDoListId]]
                                                        .map(task => task.id === action.taskId
                                                                ? {...task, isDone: action.isDone}
                                                                : task);

            return (
                {
                    ...state,
                    [action.toDoListId]: listCopy,
                }
            );

        case CHANGE_TASK_DESCRIPTION:
            const copyOfList = [...state[action.toDoListId]]
                                                            .map(task => task.id === action.taskId
                                                                ? {...task, title: action.newDescription}
                                                                : task);
            
            return (
                {
                    ...state,
                    [action.toDoListId]: copyOfList,
                }
            );

        // case ADD_TODOLIST:
        //         return (
        //             {
        //                 ...state,
        //                 [action.id]: [],
        //             }
        //         );

        // case REMOVE_TODOLIST:
        //     const newState = {...state};

        //     delete newState[action.id];

        //     return newState;

        case SET_TODOLISTS:
            const copyState = {...state};

            action.lists.forEach(list => {
                copyState[list.id] = [];
            });

            return copyState;

        case SET_TASKS: 
            return {...state, [action.toDoListId]: action.tasks};

        default:
            return state;
    };
};

export const addTaskAC = (title: string, toDoListId: string) => {
    return {type: ADD_TASK, title, toDoListId} as const;
};

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return {type: REMOVE_TASK, toDoListId, taskId} as const;
};

export const changeTaskStatusAC = (toDoListId: string, taskId: string, isDone: boolean) => {
    return {type: CHANGE_STATUS, toDoListId, taskId, isDone} as const;
};
   
export const setTasksAC = (toDoListId: string, tasks: Array<TasksType>) => {
    return {type: SET_TASKS, toDoListId, tasks} as const;
};
        
export const changeTaskDescriptionAC = (toDoListId: string, taskId: string, newDescription: string) => {
    return {type: CHANGE_TASK_DESCRIPTION, toDoListId, taskId, newDescription} as const;
};