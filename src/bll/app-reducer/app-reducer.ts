import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authAPI } from "../../api/todolists-api";
import { setIsAuthAC } from "../auth-reducer/auth-reducer";

export enum ActionTypes {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR',
    SET_APP_INITIALIZED = 'SET_APP_INITIALIZED', 
};

export type Status = 'idle' | 'loading' | 'successed' | 'failed' | null;

export type InitialStateType = {
    //проходитт ли сейчас взаимодействие с сервером
    status: Status,
    //если произойдет ошибка то мы запишем ее текст сюда
    errorMessage: string | null,
    //инициализировано ли приложение(провепен пользователь, настройки получены)
    isInitialized: boolean,
};

const initialState: InitialStateType = {
    status: 'idle' as const,
    errorMessage: null,
    isInitialized: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setErrorAC (state, action: PayloadAction<{value: string | null}>){
            state.errorMessage = action.payload.value;
        },
        setStatusAC (state, action: PayloadAction<{value: Status}>){
            state.status = action.payload.value;
        },
        setAppInitializedAC (state, action: PayloadAction<{value: boolean}>){
            state.isInitialized = action.payload.value;
        },
    },
});

export const appReducer = appSlice.reducer;

export const{ 
                setAppInitializedAC,
                setStatusAC,
                setErrorAC,
            } 
            = appSlice.actions;

export const isMeOnServerInitializedTC = () => {
    return ((dispatch: Dispatch) => {
        authAPI.isMeServerAuth()
                .then(res => {
                    if (!res.resultCode){
                        dispatch(setIsAuthAC({value: true}));
                    };

                    dispatch(setAppInitializedAC({value: true}));
                })
    });
};