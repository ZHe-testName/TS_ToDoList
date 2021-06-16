type StateType = {
    age: number,
    childrens: number,
    name: string,
};

type ActionType = {
    type: string,
    [key: string]: any,
};

export const userReduser = (state: StateType, action: ActionType) => {
    switch (action.type){
        case 'BLABLABLA':

        case 'TO':

        default:
            throw new Error('I dont understand this action type.');
    };
};