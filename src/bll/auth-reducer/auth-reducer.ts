import { handleServerAppError, handleServerNetworkError } from './../../utils/error-util';
import { setStatusAC } from './../app-reducer/app-reducer';
import { Dispatch } from 'redux';
import { SetAppErrorActionType, SetAppStatusActionType } from '../app-reducer/app-reducer';
import { authAPI } from '../../api/todolists-api';

export type AuthStateType = {
    isAuth: boolean,
};

export type ServerLoginObjectType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
};

const initialState: AuthStateType = {
    isAuth: false,
};

export type ActionType = ReturnType<typeof setIsAuthAC>;

const SET_IS_AUTH = 'SET_IS_AUTH';

const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
    switch (action.type){
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth,
            };
        }

        default:
            return state;
    };
};

export const setIsAuthAC = (isAuth: boolean) => {
    return {type: SET_IS_AUTH, isAuth} as const;
};

export const sendAuthFormTC = (formFields: ServerLoginObjectType) => {
    return (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
        dispatch(setStatusAC('loading'));

        authAPI.login(formFields)
                .then(res => {
                    if (!res.resultCode){
                        dispatch(setIsAuthAC(true));

                        dispatch(setStatusAC('successed'));
                    };

                    handleServerAppError(res, dispatch);
                })
                .catch(err => {
                    handleServerNetworkError(err.message, dispatch);
                });
    };
};

export const logOutTC = () => {
    return (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
        dispatch(setStatusAC('loading'));

        authAPI.logout()
                .then(res => {
                    if (!res.resultCode){
                        dispatch(setIsAuthAC(false));

                        dispatch(setStatusAC('successed'));
                    };

                    handleServerAppError(res, dispatch);
                })
                .catch(err => {
                    handleServerNetworkError(err.message, dispatch);
                });
    };
};

export default authReducer;