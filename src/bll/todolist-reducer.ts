import { v1 } from 'uuid';
import { ListsType } from "../App";

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';

type ActionType = {
    type: string,
    [key: string]: any,
};

export const toDoListReducer = (state: Array<ListsType>, action: ActionType): Array<ListsType> => {
    switch (action.type){
        case REMOVE_TODOLIST:
            return state.filter(list => list.id !== action.tergetId);

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
            
        default:
            throw new Error('I dont understand this action type.');
    };
};