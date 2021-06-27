import { REMOVE_TODOLIST } from './../todolist-reducer/todolist-reducer';
import { v1 } from 'uuid';
import { TasksType } from './../../App';

export const ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK'; 

type ActionType = {
    type: string,
    [key: string]: string
};

export const taskReducer = (state: Array<TasksType>, action: ActionType) => {
    switch (action.type){
        case ADD_TASK:
            const newTask = {
                id: v1(), 
                title: action.title, 
                isDone: false
            };

            return [
                ...state,
                newTask,    
            ];

        case REMOVE_TASK:
            return state.filter(task => task.id !== action.id);

        default:
            throw new Error('Task reducer do not understand this action type.');
    };
};