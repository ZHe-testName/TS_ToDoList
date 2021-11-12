import { ListsType, TasksObjPropsType } from './../AppWithRedux';
import { toDoListReducer, addTodoListAC, removeTodoListAC, setTodoListsAC } from './todolist-reducer/todolist-reducer';
import { taskReducer } from './task-reducer/task-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksObjPropsType = {};
    const startTodolistsState: Array<ListsType> = [];
 
    const action = addTodoListAC("new todolist");
 
    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = toDoListReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
 });

 test('property with todolistId should be deleted', () => {
    const startState: TasksObjPropsType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
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
 
 