export enum ActionTypes {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR', 
};

export type Status = 'idle' | 'loading' | 'successed' | 'filed';

export type InitialStateType = {
    //проходитт ли сейчас взаимодействие с сервером
    status: Status | null,
    //если произойдет ошибка то мы запишем ее текст сюда
    errorMessage: string | null,
};

const initialState: InitialStateType = {
    status: 'idle',
    errorMessage: null,
};

export const appReducer = (state: InitialStateType = initialState, action: ActonCreatorsType): InitialStateType => {
    switch (action.type){
        case ActionTypes.SET_STATUS:
            return {
                ...state,
                status: action.payload
            };

        case ActionTypes.SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            };

        default:
            return {...state}
    };
};

export const setErrorAC = (errorMessage: string | null) => ({type: ActionTypes.SET_ERROR, payload: errorMessage});
export const setStatusAC = (status: Status) => ({type: ActionTypes.SET_STATUS, payload: status});

export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;

export type ActonCreatorsType = SetErrorActionType
                                & SetStatusActionType;