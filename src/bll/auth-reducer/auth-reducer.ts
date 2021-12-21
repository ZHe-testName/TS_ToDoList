import { setStatusAC } from './../app-reducer/app-reducer';
import React from 'react';
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

export type ActionType = any;

const authReducer = (state: AuthStateType = initialState, action: ActionType) => {
    switch (action.type){
        default:
            return state;
    };
};

export const sendAuthFormTC = (formFields: ServerLoginObjectType) => {
    return (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
        dispatch(setStatusAC('loading'));

        authAPI.login(formFields);
    };
};

export default authReducer;