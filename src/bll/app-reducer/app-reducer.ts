export enum ActionTypes {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR', 
};

export type Status = 'idle' | 'loading' | 'successed' | 'failed' | null;

export type InitialStateType = {
    //проходитт ли сейчас взаимодействие с сервером
    status: Status,
    //если произойдет ошибка то мы запишем ее текст сюда
    errorMessage: string | null,
};

const initialState: InitialStateType = {
    status: 'idle' as const,
    errorMessage: null,
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

        default:
            return {...state}
    };
};

export const setErrorAC = (errorMessage: string | null) => ({type: ActionTypes.SET_ERROR, payload: errorMessage} as const);
export const setStatusAC = (status: Status) => ({type: ActionTypes.SET_STATUS, payload: status} as const);

export type SetAppErrorActionType = ReturnType<typeof setErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setStatusAC>;

export type ActonCreatorsType = SetAppErrorActionType
                                | SetAppStatusActionType;