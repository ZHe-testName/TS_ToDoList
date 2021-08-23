import {userReducer} from './user-reducer';
import {INCREMENT_AGE, ICRMENT_CHILDREN_COUNT, CHANGE_USER_NAME} from './user-reducer';

const startStage = {age: 31, childrensCount: 2, name: 'Zhekan'};

test ('use reducer should icrement age only', () => {
    const finalStage = userReducer(startStage, {type: INCREMENT_AGE});

    expect(finalStage.age).toBe(32);
    expect(finalStage.childrensCount).toBe(2);
});

test('use reduser should icrement childrens count only', () => {
    const finalStage = userReducer(startStage, {type: ICRMENT_CHILDREN_COUNT});

    expect(finalStage.childrensCount).toBe(3);
    expect(finalStage.age).toBe(31);    
});

test('user reducer shold change name of user', () => {
    const newName = 'Zhekanchik';
    
    const finalStage = userReducer(startStage, {type: CHANGE_USER_NAME, newName: newName});

    expect(finalStage.name).toBe(newName);
});