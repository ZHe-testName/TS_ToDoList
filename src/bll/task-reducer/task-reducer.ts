import { AddTodoListActionType, RemoveTodoListActionType } from './../todolist-reducer/todolist-reducer';
import { v1 } from 'uuid';
import { TasksObjPropsType } from './../../App';

export const ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_STATUS = 'CHANGE_STATUS',
    CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION',
    ADD_TODOLIST = 'ADD_TODOLIST',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST'; 

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

type ActionType = AddTaskActionType |
                RemoveTaskActionType |
                ChangeTaskStatusActionType |
                ChangeTaskDescriptionActionType |
                AddTodoListActionType |
                RemoveTodoListActionType;

export const taskReducer = (state: TasksObjPropsType, action: ActionType):TasksObjPropsType => {
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
            const listCopy = [...state[action.toDoListId]];

            const targetTask = listCopy.find(task => task.id === action.taskId);

            if (targetTask) {
                targetTask.isDone = action.isDone;
            };

            return (
                {
                    ...state,
                    [action.toDoListId]: listCopy,
                }
            );

        case CHANGE_TASK_DESCRIPTION:
            const copyOfList = [...state[action.toDoListId]];

            const taskTarget = copyOfList.find(task => task.id === action.taskId);
            
            if (taskTarget) {
                taskTarget.title = action.newDescription;
            };

            return (
                {
                    ...state,
                    [action.toDoListId]: copyOfList,
                }
            );

        case ADD_TODOLIST:
                return (
                    {
                        ...state,
                        [action.id]: [],
                    }
                );

        case REMOVE_TODOLIST:
            const newState = {...state};

            delete newState[action.id];

            return newState;

        default:
            throw new Error('Task reducer do not understand this action type.');
    };
};

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => ({type: ADD_TASK, title, toDoListId});
export const removeTaskAC = (toDoListId: string, taskId: string): RemoveTaskActionType => ({type: REMOVE_TASK, toDoListId, taskId});
export const changeTaskStatusAC = (toDoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => 
    ({type: CHANGE_STATUS, toDoListId, taskId, isDone});
export const changeTaskDescriptionAC = (toDoListId: string, taskId: string, newDescription: string): ChangeTaskDescriptionActionType => 
    ({type: CHANGE_TASK_DESCRIPTION, toDoListId, taskId, newDescription});