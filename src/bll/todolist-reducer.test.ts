import { toDoListReducer, REMOVE_TODOLIST, ADD_TODOLIST, CHANGE_TODOLIST_TITLE } from './todolist-reducer';
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

    const toDoListTitle = 'New ToDo List';

    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},
    ];

    const endStage = toDoListReducer(startStage, {type: ADD_TODOLIST, title: toDoListTitle});

    expect(endStage.length).toBe(3);
    expect(endStage[2].title).toBe(toDoListTitle);
    expect(endStage[2].filter).toBe('all');
});

test ('target todo list should correctly change its name', () => {
    const toDoListId1 = v1(),
        toDoListId2 = v1();

    const newToDoListTitle = 'New ToDo List';

    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},
    ];

    const action = {
        type: CHANGE_TODOLIST_TITLE,
        id: toDoListId2,
        title: newToDoListTitle,
    };

    const endStage = toDoListReducer(startStage, action);

    expect(endStage[0]).toBe('What to learn');
    expect(endStage[1]).toBe(newToDoListTitle);
});