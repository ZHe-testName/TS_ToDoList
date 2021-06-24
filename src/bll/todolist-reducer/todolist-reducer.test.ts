import { toDoListReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC } from './todolist-reducer';
import { ListsType } from '../../App';
import { v1 } from 'uuid';
        
test ('todo list should be removed', () => {
    const toDoListId1 = v1(),
        toDoListId2 = v1();

    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},
    ];

    const endStage = toDoListReducer(startStage, removeTodoListAC(toDoListId1));

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

    const endStage = toDoListReducer(startStage, addTodoListAC(toDoListTitle));

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

    const endStage = toDoListReducer(startStage, changeTodoListTitleAC(toDoListId2, newToDoListTitle));

    expect(endStage[0].title).toBe('What to learn');
    expect(endStage[1].title).toBe(newToDoListTitle);
});

test ('correct todo list filter should be changed', () => {
    const toDoListId1 = v1(),
        toDoListId2 = v1();

    const newToDoListFilter = 'completed' as const;

    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},
    ];

    const endStage = toDoListReducer(startStage, changeTodoListFilterAC(toDoListId2, newToDoListFilter));

    expect(endStage[0].filter).toBe('all');
    expect(endStage[1].filter).toBe(newToDoListFilter);
});