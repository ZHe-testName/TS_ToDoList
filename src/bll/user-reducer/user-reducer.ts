export const INCREMENT_AGE = 'INCREMENT_AGE',
            ICRMENT_CHILDREN_COUNT = 'ICRMENT_CHILDREN_COUNT',
            CHANGE_USER_NAME = 'CHANGE_USER_NAME';

type StateType = {
    age: number,
    childrensCount: number,
    name: string,
};

type ActionType = {
    type: string,
    [key: string]: any,
};

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type){
        case INCREMENT_AGE:
            return {
                ...state,
                age: state.age + 1,
            };
        case ICRMENT_CHILDREN_COUNT:
            return {
                ...state,
                childrensCount: state.childrensCount + 1,
            };
            case CHANGE_USER_NAME:
                return {
                    ...state,
                    name: action.newName,
                };
        default:
            throw new Error('I dont understand this action type.');
    };
};