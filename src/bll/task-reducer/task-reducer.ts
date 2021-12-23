import { tasksAPI, TaskChangeType } from './../../api/todolists-api';
import { TasksObjPropsType } from './../../AppWithRedux';
import { SetTodoListsActionType, AddTodoListActionType, RemoveTodoListActionType } from './../todolist-reducer/todolist-reducer';
import { Dispatch } from 'redux';
import { AppRootStateType } from '../state/store';
import { SetAppErrorActionType, SetAppStatusActionType, setStatusAC } from '../app-reducer/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-util';

export const ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_STATUS = 'CHANGE_STATUS',
    CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION',
    ADD_TODOLIST = 'ADD_TODOLIST',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    SET_TODOLISTS = 'SET_TODOLISTS',
    SET_TASKS = 'SET_TASKS',
    UPDATE_TASK = 'UPDATE_TASK'; 

export type ServerTasksType = {
    description: string | null,
    title: string,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

// export type ChangeTaskDescriptionActionType = ReturnType<typeof changeTaskDescriptionAC>;

// | ReturnType<typeof changeTaskStatusAC>
// | ReturnType<typeof changeTaskDescriptionAC>

export type ActionType = 
                ReturnType<typeof addTaskAC>
                | ReturnType<typeof removeTaskAC>
                | ReturnType<typeof updateTaskAC>
                | ReturnType<typeof setTasksAC>
                | RemoveTodoListActionType
                | SetTodoListsActionType
                | AddTodoListActionType;

const initialState: TasksObjPropsType = {}; 

export const taskReducer = (state: TasksObjPropsType = initialState, action: ActionType):TasksObjPropsType => {
    switch (action.type){
        case ADD_TASK: {
            const newTask = {
                ...action.task,
                isDone: !!action.task.status,
            };

            const newList = [...state[action.task.todoListId]];

            newList.unshift(newTask);

            return (
                {
                    ...state,
                    [action.task.todoListId]: newList,
                }
            );
        }

        case REMOVE_TASK: {
            const targetList = state[action.toDoListId];

            const resultList = targetList.filter(task => task.id !== action.taskId);

            return (
                {
                    ...state,
                    [action.toDoListId]: resultList,
                }
            );
        }

        case UPDATE_TASK: { 
            const listCopy = [...state[action.toDoListId]]
                                                        .map(task => task.id === action.taskId
                                                                ? {...task, ...action.model}
                                                                : task);

            return (
                {
                    ...state,
                    [action.toDoListId]: listCopy,
                }
            );
        }

        case ADD_TODOLIST: {
            return (
                {
                    ...state,
                    [action.list.id]: [],
                }
            );
        }

        case REMOVE_TODOLIST: {
            const newState = {...state};

            delete newState[action.id];

            return newState;
        }

        case SET_TODOLISTS: {
            const copyState = {...state};

            action.lists.forEach(list => {
                copyState[list.id] = [];
            });

            return copyState;
        }
        
        case SET_TASKS: {
            return {...state, [action.toDoListId]: action.tasks}
        }

        default:
            return state;
    };
};

export const addTaskAC = (task: ServerTasksType) => {
    return {type: ADD_TASK, task} as const;
};

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return {type: REMOVE_TASK, toDoListId, taskId} as const;
};

export const updateTaskAC = (toDoListId: string, taskId: string, model: TaskChangeType) => {
    return {type: UPDATE_TASK, toDoListId, taskId, model} as const;
};

// export const changeTaskStatusAC = (toDoListId: string, taskId: string, status: number) => {
//     return {type: CHANGE_STATUS, toDoListId, taskId, status} as const;
// };
   
export const setTasksAC = (toDoListId: string, tasks: Array<ServerTasksType>) => {
    return {type: SET_TASKS, toDoListId, tasks} as const;
};
        
// export const changeTaskDescriptionAC = (toDoListId: string, taskId: string, newDescription: string) => {
//     return {type: CHANGE_TASK_DESCRIPTION, toDoListId, taskId, newDescription} as const;
// };

///////////////////////thunk creators

export const fetchTasksTC = (listId: string) => {
    return (
        (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
            dispatch(setStatusAC('loading'));

            tasksAPI.getTasks(listId)
                .then(tasks => dispatch(setTasksAC(listId, tasks)))
                .then(() => dispatch(setStatusAC('successed')));
        }
    );
};

export const createTaskTC = (listId: string, title: string) => {
    return (
        (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
            dispatch(setStatusAC('loading'));

            tasksAPI.createTask(listId, title)
                .then(data => {
                    if (!data.resultCode){
                        dispatch(addTaskAC(data.data.item));
                    }

                    handleServerAppError(data, dispatch);
                })
                .catch(err => {
                    handleServerNetworkError(err.message, dispatch);
                });
        }
    );
};

export const deleteTaskTC = (listId: string, taskId: string) => {
    return (
        (dispatch: Dispatch<ActionType>) => {
            tasksAPI.deleteTask(listId, taskId)
                .then(resultCode => {
                    if (!resultCode){
                        dispatch(removeTaskAC(listId, taskId));
                    }
                })
                .catch(err => console.log(err));
        }
    );
};

export type ThunkModelType = {
    addedDate?: string,
    deadline?: string | null,
    priority?: number,
    startDate?: string | null,
    status?: number,
    title?: string,
};

export const updateTaskTC = (listId: string, taskId: string, model: ThunkModelType) => {
    return (
        (dispatch: Dispatch<ActionType | SetAppStatusActionType>, getState: () => AppRootStateType) => {
            const state = getState();

            const task = state.tasks[listId].find(task => task.id === taskId);

            if (!task){
                console.warn('no such task or todolist!!!');

                return;
            }

            const lockalModel = {
                addedDate: task.addedDate,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: task.title,
                ...model
            };

            dispatch(setStatusAC('loading'));

            tasksAPI.updateTask(listId, taskId, lockalModel)
                .then(data => {
                    dispatch(updateTaskAC(listId, taskId, JSON.parse(data)));

                    dispatch(setStatusAC('successed'));
                })
                .catch(err => console.log(err));
        }
    );
};