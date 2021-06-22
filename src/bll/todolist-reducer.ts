import { ListsType } from "../App";

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';

type ActionType = {
    type: string,
    [key: string]: any,
};

export const toDoListReducer = (state: Array<ListsType>, action: ActionType): Array<ListsType> => {
    switch (action.type){
        case REMOVE_TODOLIST:
 

        default:
            throw new Error('I dont understand this action type.');
    };
};