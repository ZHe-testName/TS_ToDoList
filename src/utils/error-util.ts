import { Dispatch } from "redux";
import { ResponceToDoListType } from "../api/todolists-api";
import { setErrorAC, setStatusAC } from "../bll/app-reducer/app-reducer";

export const handleServerAppError = <D>(
                                        data: ResponceToDoListType<D>, 
                                        dispatch: Dispatch
                                        ) => {
    if (data.resultCode && data.messages.length){
        dispatch(setErrorAC({value: data.messages[0]}));
    }

    dispatch(setStatusAC({value: 'failed'}));
};

export const handleServerNetworkError = (
                                        err: string, 
                                        dispatch: Dispatch
                                        ) => {
    dispatch(setErrorAC({value: err ? err : 'Some error occurred.'}));

    dispatch(setStatusAC({value: 'failed'}));
};