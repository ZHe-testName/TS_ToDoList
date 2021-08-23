import { addTodoListAC } from './../todolist-reducer/todolist-reducer';
import { TasksObjPropsType } from './../../App';
import { taskReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskDescriptionAC } from './task-reducer';

const startState: TasksObjPropsType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false }
        ],
    };

test ('should add new task to target todolist', () => {
    const action = addTaskAC('juce', 'todolistId2');

    const endState = taskReducer(startState, action);
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test ('should remove task from target todolist', () => {
    const action = removeTaskAC('todolistId2', '2');

    const endStage = taskReducer(startState, action);

    expect(endStage).toEqual({
            'todolistId1': [
                { id: '1', title: 'CSS', isDone: false },
                { id: '2', title: 'JS', isDone: true },
                { id: '3', title: 'React', isDone: false }
            ],
            'todolistId2': [
                { id: '1', title: 'bread', isDone: false },
                { id: '3', title: 'tea', isDone: false }
            ]
        });
});

test ('should change status of specified task', () => {
    const action = changeTaskStatusAC('todolistId2', '2', false);

    const endStage = taskReducer(startState, action);

    expect(endStage['todolistId2'][1].isDone).toBe(false);
    expect(endStage['todolistId1'][1].isDone).toBe(true);
 
})

test ('should change task description in correct todo list task', () => {
    const action = changeTaskDescriptionAC('todolistId2', '2', 'Some new description');

    const endStage = taskReducer(startState, action);

    expect(endStage['todolistId2'][1].title).toBe('Some new description');
    expect(endStage['todolistId1'][1].title).toBe('JS');
});

test ('new empty array should be added, when toDoList is added', () => {
    const action = addTodoListAC('title no matter');

    const endStage = taskReducer(startState, action);

    const keys = Object.keys(endStage);
    const newKey  = keys.find(key => key !== 'todolistId1' && key !== 'todolistId2');

    if (!newKey){
        throw Error('newkey shold be added');
    };

    expect(keys.length).toBe(3);
    expect(endStage[newKey]).toEqual([]);
});
