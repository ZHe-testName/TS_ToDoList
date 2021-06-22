import {userReducer} from './user-reducer';
import {INCREMENT_AGE, ICRMENT_CHILDREN_COUNT} from './user-reducer';

test ('use reducer should icrement age only', () => {
    const startStage = {age: 31, childrensCount: 2, name: 'Zhekan'};
    
    const finalStage = userReducer(startStage, {type: INCREMENT_AGE});

    expect(finalStage.age).toBe(32);
    expect(finalStage.childrensCount).toBe(2);
});

test('use reduser should icrement childrens count only', () => {
    const startStage = {age: 31, childrensCount: 2, name: 'Zhekan'};
    
    const finalStage = userReducer(startStage, {type: ICRMENT_CHILDREN_COUNT});

    expect(finalStage.childrensCount).toBe(3);
    expect(finalStage.age).toBe(31);    
});