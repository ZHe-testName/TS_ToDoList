import { toDoListReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, setTodoListsAC, changeTodoListEntityStatusAC } from './todolist-reducer';
import { ListsType } from '../../AppWithRedux';
import { v1 } from 'uuid';

const toDoListId1 = v1(),
    toDoListId2 = v1();
        
test ('todo list should be removed', () => {
    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', addedDate: null, entityStatus: 'idle', order: 0, filter: 'all'},
        {id: toDoListId2, title: 'What to do', addedDate: null, entityStatus: 'loading', order: 0, filter: 'all'},
    ];

    const endStage = toDoListReducer(startStage, removeTodoListAC(toDoListId1));

    expect(endStage.length).toBe(1);
    expect(endStage[0].id).toBe(toDoListId2);
});

test ('correct todo list should be added', () => {
    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', addedDate: null, entityStatus: 'idle', order: 0, filter: 'all'},
        {id: toDoListId2, title: 'What to do', addedDate: null, entityStatus: 'loading', order: 0, filter: 'all'},
    ];

    const toDoListTitle = {
        id: 'new todolist',
        title: 'get',
        addedDate: '',
        order: 0,
    };

    const endStage = toDoListReducer(startStage, addTodoListAC(toDoListTitle));

    expect(endStage.length).toBe(3);
    expect(endStage[2].title).toBe(toDoListTitle.title);
    expect(endStage[2].filter).toBe('all');
});

test ('target todo list should correctly change its title', () => {
    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', addedDate: null, entityStatus: 'idle', order: 0, filter: 'all'},
        {id: toDoListId2, title: 'What to do', addedDate: null, entityStatus: 'loading', order: 0, filter: 'all'},
    ];

    const newToDoListTitle = 'New ToDo List';

    const endStage = toDoListReducer(startStage, changeTodoListTitleAC(toDoListId2, newToDoListTitle));

    expect(endStage[0].title).toBe('What to learn');
    expect(endStage[1].title).toBe(newToDoListTitle);
});

test ('correct todo list filter should be changed', () => {
    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', addedDate: null, entityStatus: 'idle', order: 0, filter: 'all'},
        {id: toDoListId2, title: 'What to do', addedDate: null, entityStatus: 'loading', order: 0, filter: 'all'},
    ]; 

    const newToDoListFilter = 'completed' as const;

    const endStage = toDoListReducer(startStage, changeTodoListFilterAC(toDoListId2, newToDoListFilter));

    expect(endStage[0].filter).toBe('all');
    expect(endStage[1].filter).toBe(newToDoListFilter);
});

test ('all todo lists must be seted into state', () => {
    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', addedDate: null, entityStatus: 'idle', order: 0, filter: 'all'},
        {id: toDoListId2, title: 'What to do', addedDate: null, entityStatus: 'loading', order: 0, filter: 'all'},
    ];

    const endStage = toDoListReducer([], setTodoListsAC(startStage));

    expect(endStage.length).toBe(2);
});


test ('correct todo list entity status should be changed', () => {
    const startStage: Array<ListsType> = [
        {id: toDoListId1, title: 'What to learn', addedDate: null, entityStatus: 'idle', order: 0, filter: 'all'},
        {id: toDoListId2, title: 'What to do', addedDate: null, entityStatus: 'loading', order: 0, filter: 'all'},
    ]; 

    const newStatus = 'idle' as const;

    const endStage = toDoListReducer(startStage, changeTodoListEntityStatusAC(toDoListId2, newStatus));

    expect(endStage[0].entityStatus).toBe('idle');
    expect(endStage[1].entityStatus).toBe('idle');
});