import { Status } from './../app-reducer/app-reducer';
import { todoListsAPI } from './../../api/todolists-api';
import { Dispatch } from 'redux';
import { FilterValuesType, ListsType, ServerListType } from './../../AppWithRedux';
import { setStatusAC } from '../app-reducer/app-reducer';
import { handleServerNetworkError } from '../../utils/error-util';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
// export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC> ;
// export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;

// type ActionType = 
//                 ReturnType<typeof addTodoListAC> 
//                 | ReturnType<typeof removeTodoListAC> 
//                 | ReturnType<typeof changeTodoListTitleAC>  
//                 | ReturnType<typeof changeTodoListFilterAC> 
//                 | ReturnType<typeof setTodoListsAC>
//                 | ReturnType<typeof changeTodoListEntityStatusAC>;;

const initialState: Array<ListsType> = []; 

const todolistSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        addTodoListAC (state, action: PayloadAction<{value: ServerListType}>){
            state.push({...action.payload.value, filter: 'all', entityStatus: 'idle',});
        },

        removeTodoListAC (state, action: PayloadAction<{value: string}>){
            state.filter(list => list.id !== action.payload.value); 
        },

        changeTodoListTitleAC (state, action: PayloadAction<{todoListId: string, title: string}>){
            const targetTask = state.find(task => task.id === action.payload.todoListId);
    
            if (targetTask){
                targetTask.title = action.payload.title;
            };
        },

        changeTodoListFilterAC (state, action: PayloadAction<{todoListId: string, filter: FilterValuesType}>){
            const targetList = state.find(list => list.id === action.payload.todoListId);
            
            if (targetList){
                targetList.filter = action.payload.filter;
            };
        },

        setTodoListsAC (state, action: PayloadAction<{lists: Array<ServerListType>}>){
            state = action.payload.lists.map((list: ServerListType) => ({...list, filter: 'all', entityStatus: 'idle',}));
        },

        changeTodoListEntityStatusAC (state, action: PayloadAction<{id: string, status: Status}>){
            const targetTask = state.find(task => task.id === action.payload.id);
    
            if (targetTask){
                targetTask.entityStatus = action.payload.status;
            };
        },
    },
});

export const toDoListReducer = todolistSlice.reducer;

export const {
    setTodoListsAC,
    addTodoListAC,
    changeTodoListEntityStatusAC,
    removeTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    } = todolistSlice.actions;

//thunks cretors
//в данном случае создание санкриейтора избыточно
//санкриейторы используются для создания замыканий
//на случай если а санку нужно будет передать какието данные
export const fetchToDoListThunkTC = () => {
    return (
        (dispatch: Dispatch) => {
            dispatch(setStatusAC({value: 'loading'}));

            todoListsAPI.getToDoLists()
                    .then(data => {
                        dispatch(setTodoListsAC({lists: data}));

                        dispatch(setStatusAC({value: 'successed'}));
                    })
                    .catch(err => {
                        handleServerNetworkError(err.message, dispatch);
                    });;
        }
    );
};

export const addToDoListTC = (title: string) => {
    return (
        (dispatch: Dispatch) => {
            dispatch(setStatusAC({value: 'loading'}));

            todoListsAPI.createToDoList(title)
                .then(res => {
                    dispatch(addTodoListAC({value: res.data.item}));

                    dispatch(setStatusAC({value: 'successed'}));
                });
        }
    );
};

export const removeToDoListTC = (listId: string) => {
    return (
        (dispatch: Dispatch) => {
            dispatch(setStatusAC({value: 'loading'}));
            dispatch(changeTodoListEntityStatusAC({id: listId, status: 'loading'}));

            todoListsAPI.deleteToDoLIst(listId)
                .then(resultCode => {
                    if (!resultCode){
                        dispatch(removeTodoListAC({value: listId}));

                        dispatch(setStatusAC({value: 'successed'}));
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
                    dispatch(changeTodoListTitleAC({todoListId: listId, title: JSON.parse(data.data).title}));
                });
        }
    );
};
