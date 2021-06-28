import { v1 } from 'uuid';
import { ADD_TASK, CHANGE_STATUS, REMOVE_TASK, taskReducer, addTaskAC, removeTaskAC, changeTaskStatusAC } from './task-reducer';
import { TasksType } from '../../App';

test ('should add new task to target todolist', () => {
    const taskId1 = v1(),
        taskId2 = v1();

    const taskTitle = 'New title';

    const startStage: Array<TasksType> = [
        {id: taskId1, title: 'Learn React', isDone: false},
        {id: taskId2, title: 'Buy Suzuki GSXR', isDone: false},
    ];

    const endStage = taskReducer(startStage, addTaskAC(taskTitle));

    expect(endStage.length).toBe(3);
    expect(endStage[2].title).toBe(taskTitle);
});

test ('should remove task from target todolist', () => {
    const taskId1 = v1(),
        taskId2 = v1();

    const startStage: Array<TasksType> = [
        {id: taskId1, title: 'Learn React', isDone: false},
        {id: taskId2, title: 'Buy Suzuki GSXR', isDone: false},
    ];

    const endStage = taskReducer(startStage, removeTaskAC(taskId1));

    expect(endStage.length).toBe(1);
    expect(endStage[0].id).toBe(taskId2); 
});

test ('should change task status in corect todo list', () => {
    const taskId1 = v1(),
        taskId2 = v1();

    const startStage: Array<TasksType> = [
        {id: taskId1, title: 'Learn React', isDone: false},
        {id: taskId2, title: 'Buy Suzuki GSXR', isDone: false},
    ];

    const endStage = taskReducer(startStage, changeTaskStatusAC(taskId1));

    expect(endStage[0].isDone).toBe(true); 
});
