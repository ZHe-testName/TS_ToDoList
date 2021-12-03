import { appReducer, InitialStateType, setErrorAC, setStatusAC } from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        errorMessage: null,
        status: 'idle',
    };
});

test('correct error message must be seted', () => {
    const endState: InitialStateType = appReducer(startState, setErrorAC('is error'));

    expect(endState.errorMessage).toBe('is error');
});

test('correct status must be seted', () => {
    const endState: InitialStateType = appReducer(startState, setStatusAC('successed'));

    expect(endState.status).toBe('successed');
});