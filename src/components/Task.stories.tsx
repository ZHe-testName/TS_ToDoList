import React from 'react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';

export default {
    title: 'Task Component',
    component: Task,
};

const removeTaskCallback = action('Task was removed');
const changeTaskStatusCallback = action('Task status was changed');
const setNewTaskTitleCallback = action('Task title was changed');

export const TaskBasicExsample = () => {
    return (
        <>
            <Task
                toDoListId={'toDoListId1'}
                task={{id: '1', isDone: true, title: 'CSS'}}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                setNewTaskTitle={setNewTaskTitleCallback} />

            <Task
                toDoListId={'toDoListId2'}
                task={{id: '2', isDone: false, title: 'JS'}}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                setNewTaskTitle={setNewTaskTitleCallback} />
        </>
    );
};