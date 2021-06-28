import { v1 } from 'uuid';
import { TasksType } from './../../App';

export const ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_STATUS = 'CHANGE_STATUS',
    CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION'; 

export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
};

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    id: string,
};

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_STATUS',
    id: string,
};

export type ChangeTaskDescriptionActionType = {
    type: 'CHANGE_TASK_DESCRIPTION',
    id: string,
    newDescription: string,
};

type ActionType = AddTaskActionType |
                RemoveTaskActionType |
                ChangeTaskStatusActionType |
                ChangeTaskDescriptionActionType;

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

        case CHANGE_STATUS:
            const stateCopy = [...state];

            const targetTask = stateCopy.find(task => task.id === action.id);

            if (targetTask) {
                targetTask.isDone = !targetTask.isDone;
            };

            return stateCopy;

        case CHANGE_TASK_DESCRIPTION:
            const copyOfState = [...state];

            const taskTarget = copyOfState.find(task => task.id === action.id);
            
            if (taskTarget) {
                taskTarget.title = action.newDescription;
            };

            return copyOfState;

        default:
            throw new Error('Task reducer do not understand this action type.');
    };
};

export const addTaskAC = (title: string): AddTaskActionType => ({type: ADD_TASK, title: title});
export const removeTaskAC = (id: string): RemoveTaskActionType => ({type: REMOVE_TASK, id: id});
export const changeTaskStatusAC = (id: string): ChangeTaskStatusActionType => ({type: CHANGE_STATUS, id: id});
export const changeTaskDescriptionAC = (id: string, newDescription: string): ChangeTaskDescriptionActionType => ({type: CHANGE_TASK_DESCRIPTION, id: id, newDescription: newDescription});