import { SetAppErrorActionType, SetAppStatusActionType } from './../bll/app-reducer/app-reducer';
import { Dispatch } from "redux";
import { ResponceToDoListType } from "../api/todolists-api";
import { setErrorAC, setStatusAC } from "../bll/app-reducer/app-reducer";

export const handleServerAppError = <D>(
                                        data: ResponceToDoListType<D>, 
                                        dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>
                                        ) => {
    if (data.resultCode && data.messages.length){
        dispatch(setErrorAC(data.messages[0]));
    }

    dispatch(setStatusAC('failed'));
};

export const handleServerNetworkError = (
                                        err: string, 
                                        dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>
                                        ) => {
    dispatch(setErrorAC(err ? err : 'Some error occurred.'));

    dispatch(setStatusAC('failed'));
};