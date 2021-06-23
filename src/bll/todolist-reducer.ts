import { FilterValuesType } from './../App';
import { v1 } from 'uuid';
import { ListsType } from "../App";

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

export type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST',
    id: string,
};

export type AddTodoListActionType = {
    type: 'ADD_TODOLIST',
    title: string,
};

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string,
    title: string,
};

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    id: string,
    filter: FilterValuesType
};

type ActionType = RemoveTodoListActionType |
                AddTodoListActionType |
                ChangeTodoListTitleActionType |
                ChangeTodoListFilterActionType;

export const toDoListReducer = (state: Array<ListsType>, action: ActionType): Array<ListsType> => {
    switch (action.type){
        case REMOVE_TODOLIST:
            return state.filter(list => list.id !== action.id);

        case ADD_TODOLIST: 
            const newToDoList: ListsType = {
                id: v1(),
                title: action.title,
                filter: 'all',
            };

            return [
                ...state,
                newToDoList,
            ];

        case CHANGE_TODOLIST_TITLE:
            const copyOfState = [...state];
            const targetTask = copyOfState.find(task => task.id === action.id);
    
            if (targetTask){
                targetTask.title = action.title;
            };

            return copyOfState;

        case CHANGE_TODOLIST_FILTER:
            const newState = [...state]; 
            const targetList = newState.find(list => list.id === action.id);
            
            if (targetList){
                targetList.filter = action.filter;
            };

            return newState;
            
        default:
            throw new Error('I dont understand this action type.');
    };
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: ADD_TODOLIST, title: title};
};

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: REMOVE_TODOLIST, id: todoListId};
};

export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: CHANGE_TODOLIST_TITLE, id: todoListId, title: title};
};

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: CHANGE_TODOLIST_FILTER, id: todoListId, filter: filter};
};