import { handleServerAppError, handleServerNetworkError } from './../../utils/error-util';
import { setStatusAC } from './../app-reducer/app-reducer';
import { Dispatch } from 'redux';
// import { SetAppErrorActionType, SetAppStatusActionType } from '../app-reducer/app-reducer';
import { authAPI } from '../../api/todolists-api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// export type ActionType = ReturnType<typeof setIsAuthAC>;

// const SET_IS_AUTH = 'SET_IS_AUTH';

//для того чтобы не писать в ручную всю типизацию, 
//и прочий бойлерплейт(шаблонный код)
//в redux-toolkit есть функция createSlice которая берет на себя огоромный кусок рутинной работы
//ее идея в том чобы создавать куски стейта на подобии того как их делили редюсеры

const authSlice = createSlice({
    name: 'auth',//имя на основании которого будут сздаватться все все названия и переменные

    initialState: initialState,//стартовый стейт

    reducers: {//тулкит сам будет отвечать за реадизацию редюсера
        //но так как наш редюсер состоит из маленьких редюсеров
        //то тут каждый нужно настроить

        //каждый подредюсер передается в качестве метода объекта reducers
        //с именем таким как его ждет внешний код
        //каждый подредюсер принимает как и редюсер стейт и экшн
        //вся типизация стейта и типы экшенов, экшнкриейторы
        //все это берет на себя тулкит

        //так же immerjs под капотом делает для нас копию стейта
        //и благодаря этому мы можем свободно тут меня твсе как будто никакой имутабельности не существует

        //нагрузку в екшене важно называть payload а не както иначе
        setIsAuthAC (state, action: PayloadAction<{value: boolean}>){
            state.isAuth = action.payload.value;
        }
    },

});

const authReducer = authSlice.reducer;// в одном из свойств обекта slice и будет хранится редюсер нашего куска стейта

// const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
//     switch (action.type){
//         case SET_IS_AUTH: {//эти значения будут генерится встроеной библиотекой immerjs
//             return {//еще эта библиотека нужна для того чтобы работать с имутабельностю как с обичным значением
//                 //то есть без лишних копий, в том числе и глубоких
//                 //это типо удобно))
//                 ...state,
//                 isAuth: action.isAuth,
//             };
//         }

//         default:
//             return state;
//     };
// };

// export const setIsAuthAC = (isAuth: boolean) => {
//     return {type: SET_IS_AUTH, isAuth} as const;
// };

//экшкриейтор для санок можно достать из свойства слайса
export const {setIsAuthAC} = authSlice.actions;

//ТУЛКИТ ПОМОГАЕТ ИЗБАВИТСЯ ОТ ОООЧЕНЬ БОЛЬШОГО КУСКА БОЙЛЕРПЛЕЙТ КОДА
export const sendAuthFormTC = (formFields: ServerLoginObjectType) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({value: 'loading'}));

        authAPI.login(formFields)
                .then(res => {
                    if (!res.resultCode){
                        dispatch(setIsAuthAC({value: true}));

                        dispatch(setStatusAC({value: 'successed'}));
                    };

                    handleServerAppError(res, dispatch);
                })
                .catch(err => {
                    handleServerNetworkError(err.message, dispatch);
                });
    };
};

export const logOutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({value: 'loading'}));

        authAPI.logout()
                .then(res => {
                    if (!res.resultCode){
                        dispatch(setIsAuthAC({value: false}));

                        dispatch(setStatusAC({value: 'successed'}));
                    };

                    handleServerAppError(res, dispatch);
                })
                .catch(err => {
                    handleServerNetworkError(err.message, dispatch);
                });
    };
};

export default authReducer;