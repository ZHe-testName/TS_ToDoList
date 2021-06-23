import { toDoListReducer, REMOVE_TODOLIST, ADD_TODOLIST } from './todolist-reducer';
import { ListsType } from './../App';
import { v1 } from 'uuid';
        
        
test ('todo list should be removed', () => {
    const toDoListId1 = v1(),
        toDoListId2 = v1();

    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},
    ];

    const endStage = toDoListReducer(startStage, {type: REMOVE_TODOLIST, tergetId: toDoListId1});

    expect(endStage.length).toBe(1);
    expect(endStage[0].id).toBe(toDoListId2);
});

test ('correct todo list should be added', () => {
    const toDoListId1 = v1(),
        toDoListId2 = v1();

    const newToDoListTitle = 'Newe TiDi List';

    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},
    ];

    const endStage = toDoListReducer(startStage, {type: ADD_TODOLIST, newTitle: newToDoListTitle});

    expect(endStage.length).toBe(3);
    expect(endStage[2].title).toBe(newToDoListTitle);
    expect(endStage[2].filter).toBe('all');
});