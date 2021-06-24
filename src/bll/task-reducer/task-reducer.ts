import { v1 } from 'uuid';
import { TasksType } from './../../App';

export const ADD_TASK = 'ADD_TASK'; 

type ActionType = {
    type: string,
    [key: string]: string
};

const taskReducer = (state: Array<TasksType>, action: ActionType) => {
    switch (action.type){
        case ADD_TASK:
            return [
                {id: v1(), title: 'title', isDone: false}
            ];
    };
};