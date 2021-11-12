import { todoListsAPI } from './../../api/todolists-api';
import { TasksObjPropsType, TasksType } from './../../AppWithRedux';
import { SetTodoListsActionType, AddTodoListActionType, RemoveTodoListActionType } from './../todolist-reducer/todolist-reducer';
import { v1 } from 'uuid';      
import { Dispatch } from 'redux';

export const ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_STATUS = 'CHANGE_STATUS',
    CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION',
    ADD_TODOLIST = 'ADD_TODOLIST',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    SET_TODOLISTS = 'SET_TODOLISTS',
    SET_TASKS = 'SET_TASKS'; 

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

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

export type ChangeTaskDescriptionActionType = ReturnType<typeof changeTaskDescriptionAC>;

type ActionType = 
                ReturnType<typeof addTaskAC>
                | ReturnType<typeof removeTaskAC>
                | ReturnType<typeof changeTaskStatusAC>
                | ReturnType<typeof changeTaskDescriptionAC>
                | ReturnType<typeof setTasksAC>
                | RemoveTodoListActionType
                | SetTodoListsActionType
                | AddTodoListActionType;

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

        case SET_TODOLISTS:
            const copyState = {...state};

            action.lists.forEach(list => {
                copyState[list.id] = [];
            });

            return copyState;

        case SET_TASKS: 
            return {...state, [action.toDoListId]: action.tasks.map(task => ({  
                                                                                id: task.id, 
                                                                                isDone: !!task.status,
                                                                                title: task.title
                                                                            }))};

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
   
export const setTasksAC = (toDoListId: string, tasks: Array<ServerTasksType>) => {
    return {type: SET_TASKS, toDoListId, tasks} as const;
};
        
export const changeTaskDescriptionAC = (toDoListId: string, taskId: string, newDescription: string) => {
    return {type: CHANGE_TASK_DESCRIPTION, toDoListId, taskId, newDescription} as const;
};

///////////////////////thunk creators

export const fetchTasksTC = (listId: string) => {
    return (
        (dispatch: Dispatch) => {
            todoListsAPI.getTasks(listId)
                .then(tasks => dispatch(setTasksAC(listId, tasks)));
        }
    );
};