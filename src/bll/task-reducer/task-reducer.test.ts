import { v1 } from 'uuid';
import { ADD_TASK } from './task-reducer';
import { TasksType } from '../../App';

test ('should to add new task to target todolist', () => {
    const taskId1 = v1(),
        taskId2 = v1();

    const taskTitle = 'New title';

    const startStage: Array<TasksType> = [
        {id: taskId1, title: 'Learn React', isDone: false},
        {id: taskId2, title: 'Buy Suzuki GSXR', isDone: false},
    ];

    
});