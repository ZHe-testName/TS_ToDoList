import { tasksAPI } from './../../api/todolists-api';
import { TasksObjPropsType } from './../../AppWithRedux';
import { SetTodoListsActionType, AddTodoListActionType, RemoveTodoListActionType } from './../todolist-reducer/todolist-reducer';
import { Dispatch } from 'redux';
import { AppRootStateType } from '../state/store';

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
                ...action.task,
                isDone: !!action.task.status,
            };

            const newList = [...state[action.task.todoListId]];

            newList.push(newTask);

            return (
                {
                    ...state,
                    [action.task.todoListId]: newList,
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
                                                                ? {...task, status: action.status}
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
                        [action.list.id]: [],
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
            return {...state, [action.toDoListId]: action.tasks}

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

export const changeTaskStatusAC = (toDoListId: string, taskId: string, status: number) => {
    return {type: CHANGE_STATUS, toDoListId, taskId, status} as const;
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
            tasksAPI.getTasks(listId)
                .then(tasks => dispatch(setTasksAC(listId, tasks)));
        }
    );
};

export const createTaskTC = (listId: string, title: string) => {
    return (
        (dispatch: Dispatch) => {
            tasksAPI.createTask(listId, title)
                .then(data => {
                    if (!data.resultCode){
                        dispatch(addTaskAC(data.data.item));
                    }
                })
                .catch(err => console.log(err));
        }
    );
};

export const deleteTaskTC = (listId: string, taskId: string) => {
    return (
        (dispatch: Dispatch) => {
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

export const changeTaskDescriptionTC = (listId: string, taskId: string, newTitle: string) => {
    return (
        (dispatch: Dispatch, getState: () => AppRootStateType) => {
            const state = getState();

            const task = state.tasks[listId].find(task => task.id === taskId);

            if (!task){
                console.warn('no such task or todolist!!!');

                return;
            }

            const model = {
                addedDate: task.addedDate,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: newTitle,
            };

            tasksAPI.updateTask(listId, taskId, model)
                .then(data => {
                    dispatch(changeTaskDescriptionAC(listId, taskId, JSON.parse(data).title))
                })
                .catch(err => console.log(err));
        }
    );
};

export const changeTaskStatusTC = (listId: string, taskId: string, status: number) => {
    return (
        (dispatch: Dispatch, getState: () => AppRootStateType) => {
            const state = getState();

            const task = state.tasks[listId].find(task => task.id === taskId);

            if (!task){
                console.warn('no such task or todolist!!!');

                return;
            }

            const model = {
                addedDate: task.addedDate,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: status,
                title: task.title,
            };

            tasksAPI.updateTask(listId, taskId, model)
                .then(data => {
                    dispatch(changeTaskStatusAC(listId, taskId, JSON.parse(data).status))
                })
                .catch(err => console.log(err));
        }
    );
};