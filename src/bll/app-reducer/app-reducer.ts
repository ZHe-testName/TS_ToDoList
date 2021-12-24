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

export const appReducer = (state: InitialStateType = initialState, action: ActonCreatorsType): InitialStateType => {
    switch (action.type){
        case ActionTypes.SET_STATUS: {
            return {
                ...state,
                status: action.payload,
            };
        }

        case ActionTypes.SET_ERROR: {
            return {
                ...state,
                errorMessage: action.payload,
            };
        }

        case ActionTypes.SET_APP_INITIALIZED: {
            return {
                ...state,
                isInitialized: action.payload,
            };
        }

        default:
            return {...state}
    };
};

export const setErrorAC = (errorMessage: string | null) => ({type: ActionTypes.SET_ERROR, payload: errorMessage} as const);
export const setStatusAC = (status: Status) => ({type: ActionTypes.SET_STATUS, payload: status} as const);
export const setAppInitializedAC = (isInitialized: boolean) => ({type: ActionTypes.SET_APP_INITIALIZED, payload: isInitialized} as const);

export type SetAppErrorActionType = ReturnType<typeof setErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;

export type ActonCreatorsType = SetAppErrorActionType
                                | SetAppStatusActionType
                                | SetAppInitializedActionType;

export const isMeOnServerInitializedTC = () => {
    return ((dispatch: Dispatch) => {
        authAPI.isMeServerAuth()
                .then(res => {
                    if (!res.resultCode){
                        dispatch(setIsAuthAC(true));
                    };

                    dispatch(setAppInitializedAC(true));
                })
    });
};