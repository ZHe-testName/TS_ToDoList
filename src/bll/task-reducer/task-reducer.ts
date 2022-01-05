import { tasksAPI, TaskChangeType } from './../../api/todolists-api';
import { ServerListType, TasksObjPropsType } from './../../AppWithRedux';
// import { SetTodoListsActionType, AddTodoListActionType, RemoveTodoListActionType, addTodoListAC } from './../todolist-reducer/todolist-reducer';
import { Dispatch } from 'redux';
import { AppRootStateType } from '../state/store';
import { setStatusAC } from '../app-reducer/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-util';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTodoListAC, removeTodoListAC, setTodoListsAC } from '../todolist-reducer/todolist-reducer';

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

// export type AddTaskActionType = ReturnType<typeof addTaskAC>;

// export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

// export type ChangeTaskDescriptionActionType = ReturnType<typeof changeTaskDescriptionAC>;

// | ReturnType<typeof changeTaskStatusAC>
// | ReturnType<typeof changeTaskDescriptionAC>

// export type ActionType = 
//                 ReturnType<typeof addTaskAC>
//                 | ReturnType<typeof removeTaskAC>
//                 | ReturnType<typeof updateTaskAC>
//                 | ReturnType<typeof setTasksAC>
                // | RemoveTodoListActionType
                // | SetTodoListsActionType
                // | AddTodoListActionType;

const initialState: TasksObjPropsType = {}; 

const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTaskAC (state, action: PayloadAction<{task: ServerTasksType}>){
            const newTask = {
                ...action.payload.task
                // isDone: !!action.payload.task.status,
            };

            state[action.payload.task.todoListId].unshift(newTask);
        },
        
        removeTaskAC (state, action: PayloadAction<{toDoListId: string, taskId: string}>){
            const resultList = state[action.payload.toDoListId].filter(task => task.id !== action.payload.taskId);

            state[action.payload.toDoListId] = resultList;
        },
        
        updateTaskAC (state, action: PayloadAction<{toDoListId: string, taskId: string, model: TaskChangeType}>){
            const listCopy = state[action.payload.toDoListId]
                                                        .map(task => task.id === action.payload.taskId
                                                                ? {...task, ...action.payload.model}
                                                                : task);

            state[action.payload.toDoListId] = listCopy;
        },
           
        setTasksAC (state, action: PayloadAction<{toDoListId: string, tasks: Array<ServerTasksType>}>){
            state[action.payload.toDoListId] = action.payload.tasks;
        },
    },

    //здесь мы подписываемся на редюсеры которые не созданы в даном слайсе
    //чтобы позаимствовать типизацию у оригинальных редюсеров
    //в место объекта передать функцию

    //она принимает объект bulder и обрабатывая его методы мы можем не типизировать экшн
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.value.id] = [];
        });

        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.value];
        });

        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.lists.forEach(list => {
                state[list.id] = [];
            });
        });
    },

        // [addTodoListAC.type]: (state, action: PayloadAction<{value: ServerListType}>) =>{
        //     state[action.payload.value.id] = [];
        // },

        // [removeTodoListAC.type]: (state, action: PayloadAction<{value: string}>) => {
        //     delete state[action.payload.value];
        // },

        // [setTodoListsAC.type]: (state, action: PayloadAction<{lists: Array<ServerListType>}>) => {
        //     console.log(action.payload.lists);
        //     action.payload.lists.forEach(list => {
        //         state[list.id] = [];
        //     });
        // },
});

export const taskReducer = taskSlice.reducer;

export const {
    setTasksAC,
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
} = taskSlice.actions;

// export const taskReducer = (state: TasksObjPropsType = initialState, action: ActionType):TasksObjPropsType => {
//     switch (action.type){
//         case ADD_TASK: {
//             const newTask = {
//                 ...action.task,
//                 isDone: !!action.task.status,
//             };

//             const newList = [...state[action.task.todoListId]];

//             newList.unshift(newTask);

//             return (
//                 {
//                     ...state,
//                     [action.task.todoListId]: newList,
//                 }
//             );
//         }

//         case REMOVE_TASK: {
//             const targetList = state[action.toDoListId];

//             const resultList = targetList.filter(task => task.id !== action.taskId);

//             return (
//                 {
//                     ...state,
//                     [action.toDoListId]: resultList,
//                 }
//             );
//         }

//         case UPDATE_TASK: { 
//             const listCopy = [...state[action.toDoListId]]
//                                                         .map(task => task.id === action.taskId
//                                                                 ? {...task, ...action.model}
//                                                                 : task);

//             return (
//                 {
//                     ...state,
//                     [action.toDoListId]: listCopy,
//                 }
//             );
//         }

//         case ADD_TODOLIST: {
//             return (
//                 {
//                     ...state,
//                     [action.list.id]: [],
//                 }
//             );
//         }

//         case REMOVE_TODOLIST: {
//             const newState = {...state};

//             delete newState[action.id];

//             return newState;
//         }

//         case SET_TODOLISTS: {
//             const copyState = {...state};

//             action.lists.forEach(list => {
//                 copyState[list.id] = [];
//             });

//             return copyState;
//         }
        
//         case SET_TASKS: {
//             return {...state, [action.toDoListId]: action.tasks}
//         }

//         default:
//             return state;
//     };
// };

// export const addTaskAC = (task: ServerTasksType) => {
//     return {type: ADD_TASK, task} as const;
// };

// export const removeTaskAC = (toDoListId: string, taskId: string) => {
//     return {type: REMOVE_TASK, toDoListId, taskId} as const;
// };

// export const updateTaskAC = (toDoListId: string, taskId: string, model: TaskChangeType) => {
//     return {type: UPDATE_TASK, toDoListId, taskId, model} as const;
// };

// // export const changeTaskStatusAC = (toDoListId: string, taskId: string, status: number) => {
// //     return {type: CHANGE_STATUS, toDoListId, taskId, status} as const;
// // };
   
// export const setTasksAC = (toDoListId: string, tasks: Array<ServerTasksType>) => {
//     return {type: SET_TASKS, toDoListId, tasks} as const;
// };
        
// export const changeTaskDescriptionAC = (toDoListId: string, taskId: string, newDescription: string) => {
//     return {type: CHANGE_TASK_DESCRIPTION, toDoListId, taskId, newDescription} as const;
// };

///////////////////////thunk creators

export const fetchTasksTC = (listId: string) => {
    return (
        (dispatch: Dispatch) => {
            dispatch(setStatusAC({value: 'loading'}));

            tasksAPI.getTasks(listId)
                .then(tasks => dispatch(setTasksAC({toDoListId: listId, tasks: tasks})))
                .then(() => dispatch(setStatusAC({value: 'successed'})));
        }
    );
};

export const createTaskTC = (listId: string, title: string) => {
    return (
        (dispatch: Dispatch) => {
            dispatch(setStatusAC({value: 'loading'}));

            tasksAPI.createTask(listId, title)
                .then(data => {
                    if (!data.resultCode){
                        dispatch(addTaskAC({task: data.data.item}));
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
        (dispatch: Dispatch) => {
            tasksAPI.deleteTask(listId, taskId)
                .then(resultCode => {
                    if (!resultCode){
                        dispatch(removeTaskAC({toDoListId: listId, taskId: taskId}));
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
        (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

            dispatch(setStatusAC({value: 'loading'}));

            tasksAPI.updateTask(listId, taskId, lockalModel)
                .then(data => {
                    dispatch(updateTaskAC({toDoListId: listId, taskId: taskId, model: JSON.parse(data)}));

                    dispatch(setStatusAC({value: 'successed'}));
                })
                .catch(err => console.log(err));
        }
    );
};