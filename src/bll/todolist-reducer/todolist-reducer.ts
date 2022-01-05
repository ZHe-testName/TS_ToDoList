import { SetAppErrorActionType, Status } from './../app-reducer/app-reducer';
import { todoListsAPI } from './../../api/todolists-api';
import { Dispatch } from 'redux';
import { FilterValuesType, ListsType, ServerListType } from './../../AppWithRedux';
import { setStatusAC, SetAppStatusActionType } from '../app-reducer/app-reducer';
import { handleServerNetworkError } from '../../utils/error-util';

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    SET_TODOLISTS = 'SET_TODOLISTS',
    CHANGE_ENTITY_STATUS = 'CHANGE_ENTITY_STATUS';

//В TS для экшнкриейторов можно создавать типы в ручную
//а можно с помощю команды ReturnType создавать типы автоматически
//на основании того обьекта что возвращает экшнкриейтор

//это силно сокращает код и не нужно постоянно вносить изменения в типах

// export type RemoveTodoListActionType = {
//     type: 'REMOVE_TODOLIST',
//     id: string,
// };

// export type AddTodoListActionType = {
//     type: 'ADD_TODOLIST',
//     title: string,
//     id: string,
// };

// export type ChangeTodoListTitleActionType = {
//     type: 'CHANGE_TODOLIST_TITLE',
//     id: string,
//     title: string,
// };

// export type ChangeTodoListFilterActionType = {
//     type: 'CHANGE_TODOLIST_FILTER',
//     id: string,
//     filter: FilterValuesType
// };

// export type SetTodoListsActionType = {
//     type: 'SET_TODOLISTS',
//     lists: Array<ListsType>,
// };

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC> ;
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;

type ActionType = 
                ReturnType<typeof addTodoListAC> 
                | ReturnType<typeof removeTodoListAC> 
                | ReturnType<typeof changeTodoListTitleAC>  
                | ReturnType<typeof changeTodoListFilterAC> 
                | ReturnType<typeof setTodoListsAC>
                | ReturnType<typeof changeTodoListEntityStatusAC>;;

const initialState: Array<ListsType> = []; 

export const toDoListReducer = (state: Array<ListsType> = initialState , action: ActionType): Array<ListsType> => {
    switch (action.type){
        case REMOVE_TODOLIST: {
            return state.filter(list => list.id !== action.id);  
        }           

        case ADD_TODOLIST: {
            const newToDoList: ListsType = {...action.list, filter: 'all', entityStatus: 'idle',};

            return [
                ...state,
                newToDoList,
            ];
        }

        case CHANGE_TODOLIST_TITLE: {
            const copyOfState = [...state];
            const targetTask = copyOfState.find(task => task.id === action.id);
    
            if (targetTask){
                targetTask.title = action.title;
            };

            return copyOfState;
        }

        case CHANGE_ENTITY_STATUS: {
            const copyOfState = [...state];
            const targetTask = copyOfState.find(task => task.id === action.id);
    
            if (targetTask){
                targetTask.entityStatus = action.status;
            };

            return copyOfState;
        }

        case CHANGE_TODOLIST_FILTER: {
            const newState = state.map(item => ({...item})); 
            const targetList = newState.find(list => list.id === action.id);
            
            if (targetList){
                targetList.filter = action.filter;
            };

            return newState;
        }
        
        case SET_TODOLISTS: {
            return action.lists.map((list: ServerListType) => ({...list, filter: 'all', entityStatus: 'idle',}));
        }
            
        default:
            return state;
    };
};

// action creators
export const addTodoListAC = (list: ServerListType) => {
    return {type: ADD_TODOLIST, list} as const;
};

export const removeTodoListAC = (todoListId: string) => {
    return {type: REMOVE_TODOLIST, id: todoListId} as const;
};

export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, id: todoListId, title} as const;
};

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {type: CHANGE_TODOLIST_FILTER, id: todoListId, filter} as const;
};

export const setTodoListsAC = (lists: Array<ServerListType>) => {
    return {type: SET_TODOLISTS, lists} as const;
};

export const changeTodoListEntityStatusAC = (id: string, status: Status) => {
    return {type: CHANGE_ENTITY_STATUS, id, status} as const;
};

//thunks cretors
//в данном случае создание санкриейтора избыточно
//санкриейторы используются для создания замыканий
//на случай если а санку нужно будет передать какието данные
export const fetchToDoListThunkTC = () => {
    return (
        (dispatch: Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
            dispatch(setStatusAC('loading'));

            todoListsAPI.getToDoLists()
                    .then(data => {
                        dispatch(setTodoListsAC(data));

                        dispatch(setStatusAC('successed'));
                    })
                    .catch(err => {
                        handleServerNetworkError(err.message, dispatch);
                    });;
        }
    );
};

export const addToDoListTC = (title: string) => {
    return (
        (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
            dispatch(setStatusAC('loading'));

            todoListsAPI.createToDoList(title)
                .then(res => {
                    dispatch(addTodoListAC(res.data.item));

                    dispatch(setStatusAC('successed'));
                });
        }
    );
};

export const removeToDoListTC = (listId: string) => {
    return (
        (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
            dispatch(setStatusAC('loading'));
            dispatch(changeTodoListEntityStatusAC(listId, 'loading'));

            todoListsAPI.deleteToDoLIst(listId)
                .then(resultCode => {
                    if (!resultCode){
                        dispatch(removeTodoListAC(listId));

                        dispatch(setStatusAC('successed'));
                    }
                });
        }
    );
};

export const changeTodoListTitleTC = (listId: string, title: string) => {
    return (
        (dispatch: Dispatch) => {
            todoListsAPI.updateToDoList(listId, title)
                .then((data) => {
                    dispatch(changeTodoListTitleAC(listId, JSON.parse(data.data).title));
                });
        }
    );
};
