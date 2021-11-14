import { ListsType, TasksObjPropsType } from './../AppWithRedux';
import { toDoListReducer, addTodoListAC, removeTodoListAC, setTodoListsAC } from './todolist-reducer/todolist-reducer';
import { taskReducer } from './task-reducer/task-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksObjPropsType = {};
    const startTodolistsState: Array<ListsType> = [];
 
    const action = addTodoListAC({
        id: 'new todolist',
        title: 'get',
        addedDate: '',
        order: 0,
    });
 
    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = toDoListReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.list.id);
    expect(idFromTodolists).toBe(action.list.id);
 });

 test('property with todolistId should be deleted', () => {
    const startState: TasksObjPropsType = {
        "todolistId1": [{      
                            description: 'zzz',
                            title: 'get',
                            status: 0,
                            priority: 1,
                            startDate: '',
                            deadline: '',
                            id: 'new todo',
                            todoListId: 'new todolist',
                            order: 5,
                            addedDate: '',
                        },
                        {      
                            description: 'zzzppp',
                            title: 'catch',
                            status: 0,
                            priority: 1,
                            startDate: '',
                            deadline: '',
                            id: 'new todo1',
                            todoListId: 'new todolist',
                            order: 5,
                            addedDate: '',
                        }],

        "todolistId2": [{      
            description: '222',
            title: '111',
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
            id: '123',
            todoListId: 'new todolist2',
            order: 5,
            addedDate: '',
        },
        {      
            description: '333',
            title: '888',
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
            id: '098',
            todoListId: 'new todolist2',
            order: 5,
            addedDate: '',
        }],
    };
 
    const action = removeTodoListAC("todolistId2");
 
    const endState = taskReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
 });

 test('empty arrays should br seted when we set todolists', () => {
     const action = setTodoListsAC([
        {id: "toDoListId1", title: 'What to learn', addedDate: null, order: 0},
        {id: "toDoListId2", title: 'What to do', addedDate: null, order: 0},
     ]);

     const endState = taskReducer({}, action);

     const keys = Object.keys(endState);

     expect(keys.length).toBe(2);
     expect(endState['toDoListId1']).toStrictEqual([]);
     expect(endState['toDoListId2']).toStrictEqual([]);
 });
 
 