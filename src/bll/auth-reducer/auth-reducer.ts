import { handleServerAppError, handleServerNetworkError } from './../../utils/error-util';
import { setStatusAC } from './../app-reducer/app-reducer';
import { Dispatch } from 'redux';
import { SetAppErrorActionType, SetAppStatusActionType } from '../app-reducer/app-reducer';
import { authAPI } from '../../api/todolists-api';

export type AuthStateType = {
    isAuth: boolean,
    isMeOnServerAuth: boolean,
};

export type ServerLoginObjectType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
};

const initialState: AuthStateType = {
    isAuth: false,
    isMeOnServerAuth: false,
};

export type ActionType = ReturnType<typeof setIsAuthAC>
                            | ReturnType<typeof isMeOnServerAuthAC>;

const SET_IS_AUTH = 'SET_IS_AUTH',
    IS_ME_ON_SERVER_AUTH = 'IS_ME_ON_SERVER_AUTH';

const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
    switch (action.type){
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth,
            };
        }

        case IS_ME_ON_SERVER_AUTH: {
            return {
                ...state,
                isMeOnServerAuth: action.isMeOnServerAuth
            };
        }

        default:
            return state;
    };
};

export const setIsAuthAC = (isAuth: boolean) => {
    return {type: SET_IS_AUTH, isAuth} as const;
};

export const isMeOnServerAuthAC = (isMeOnServerAuth: boolean) => {
    return {type: IS_ME_ON_SERVER_AUTH, isMeOnServerAuth} as const;
};

export const sendAuthFormTC = (formFields: ServerLoginObjectType) => {
    return (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
        dispatch(setStatusAC('loading'));
        dispatch(setIsAuthAC(false));

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

export const isMeOnServerAuthTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'));

        authAPI.isMeServerAuth()
                .then(res => {
                    if (!res.resultCode){
                        dispatch(isMeOnServerAuthAC(true));

                        dispatch(setStatusAC('successed'));
                    };

                    dispatch(setIsAuthAC(true));

                    handleServerAppError(res, dispatch);
                })
    };
};

export default authReducer;