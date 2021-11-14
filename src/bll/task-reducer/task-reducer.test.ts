import { addTodoListAC, setTodoListsAC } from './../todolist-reducer/todolist-reducer';
import { TasksObjPropsType } from './../../AppWithRedux';
import { taskReducer, removeTaskAC, addTaskAC, setTasksAC, updateTaskAC } from './task-reducer';

const startState: TasksObjPropsType = {
        'todolistId1': [{
            description: '',
            title: 'srat',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '1',
            todoListId: 'tdl1',
            order: 2,
            addedDate: '',
        },
        {
            description: '',
            title: 'syat',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '2',
            todoListId: 'tdl1',
            order: 2,
            addedDate: '',
        }],
        'todolistId2': [{
            description: '',
            title: 'fff',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '1',
            todoListId: 'tdl2',
            order: 2,
            addedDate: '',
        },
        {
            description: '',
            title: 'ppp',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '2',
            todoListId: 'tdl2',
            order: 2,
            addedDate: '',
        }],
    };

test ('should add new task to target todolist', () => {
    const action = addTaskAC({
        description: '',
        title: 'ppp',
        status: 1,
        priority: 0,
        startDate: 'string | null',
        deadline: 'string | null',
        id: 'id2',
        todoListId: 'todolistId2',
        order: 2,
        addedDate: '',
    });

    const endState = taskReducer(startState, action);
 
    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBe('id2');
    expect(endState["todolistId2"][0].title).toBe('ppp');
    expect(!!endState["todolistId2"][0].status).toBe(true);
});

test ('should remove task from target todolist', () => {
    const action = removeTaskAC('todolistId2', '2');

    const endStage = taskReducer(startState, action);

    expect(endStage).toEqual({
        'todolistId1': [{
            description: '',
            title: 'srat',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '1',
            todoListId: 'tdl1',
            order: 2,
            addedDate: '',
        },
        {
            description: '',
            title: 'syat',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '2',
            todoListId: 'tdl1',
            order: 2,
            addedDate: '',
        }],
        'todolistId2': [{
            description: '',
            title: 'fff',
            status: 1,
            priority: 0,
            startDate: 'string | null',
            deadline: 'string | null',
            id: '1',
            todoListId: 'tdl2',
            order: 2,
            addedDate: '',
        }]
        });
});

test ('should change status of specified task', () => {
    const action = updateTaskAC('todolistId2', '2', {
        title: 'srat',
        status: 0,
        priority: 0,
        startDate: 'string | null',
        deadline: 'string | null',
        addedDate: '',
    },);

    const endStage = taskReducer(startState, action);

    expect(!!endStage['todolistId2'][1].status).toBe(false);
    expect(!!endStage['todolistId1'][1].status).toBe(true);
 
})

test ('should change task description in correct todo list task', () => {
    const action = updateTaskAC('todolistId2', '2', {
        title: 'Some new description',
        status: 1,
        priority: 0,
        startDate: 'string | null',
        deadline: 'string | null',
        addedDate: '',
    });

    const endStage = taskReducer(startState, action);

    expect(endStage['todolistId2'][1].title).toBe('Some new description');
    expect(endStage['todolistId1'][1].title).toBe('syat');
});

test ('new empty array should be added, when toDoList is added', () => {
    const action = addTodoListAC({
        id: 'new todolist',
        title: 'get',
        addedDate: '',
        order: 0,
    });

    const endStage = taskReducer(startState, action);

    const keys = Object.keys(endStage);
    const newKey  = keys.find(key => key !== 'todolistId1' && key !== 'todolistId2');

    if (!newKey){
        throw Error('new key shold be added');
    };

    expect(keys.length).toBe(3);
    expect(endStage[newKey]).toEqual([]);
});

test ('tasks should be seted into todolist', () => {
    const startState = [
        {
            description: null,
            title: 'to buy',
            completed: false,
            status: 0,
            priority: 2,
            startDate: '01-21',
            deadline: '01-21',
            id: '1',
            todoListId: 'todo1',
            order: 2,
            addedDate: 'moon',
        },
        {
            description: null,
            title: 'to Give',
            completed: false,
            status: 0,
            priority: 3,
            startDate: '01-21',
            deadline: '01-21',
            id: '2',
            todoListId: 'todo2',
            order: 1,
            addedDate: 'moon',
        },
    ];

    const action = setTasksAC('lisiId12', startState);

    const endState = taskReducer({}, action);

    expect(endState['lisiId12'].length).toBe(2);
    expect(endState['lisiId12'][1].id).toBe('2');
});

