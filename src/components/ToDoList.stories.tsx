import React from 'react';
import { action } from '@storybook/addon-actions';
import { ToDoList } from './ToDoList';

export default {
    title: 'ToDoList Component',
    component: ToDoList,
};

const filterTasksCallback = action('Tasks was filtered');
const addTaskCallback = action('Task was added');
const removeListCallback = action('Task was removed');
const addNewListHeaderCallback = action('Heder of task was changed');
const removeTaskCallback = action('Task was removed');
const changeTaskStatusCallback = action('Task status was changed');
const setNewTaskTitleCallback = action('Task title was changed');

export const EditableSpanBasicExamole = () => {
    return (
            <>
                <ToDoList 
                id='1' 
                title='Test Title'
                filter='completed'
                tasks={[{id: '1', isDone: true, title: 'CSS'}]}
                setFilter={filterTasksCallback}
                addTask={addTaskCallback}
                removeList={removeListCallback}
                addNewListHeader={addNewListHeaderCallback}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                setNewTaskTitle={setNewTaskTitleCallback}/>

                <ToDoList 
                    id='2' 
                    title='Test Title 2'
                    filter='active'
                    tasks={[{id: '2', isDone: false, title: 'JS'}]}
                    setFilter={filterTasksCallback}
                    addTask={addTaskCallback}
                    removeList={removeListCallback}
                    addNewListHeader={addNewListHeaderCallback}
                    removeTask={removeTaskCallback}
                    changeTaskStatus={changeTaskStatusCallback}
                    setNewTaskTitle={setNewTaskTitleCallback}/>

                <ToDoList 
                    id='3' 
                    title='Test Title 3'
                    filter='all'
                    tasks={[{id: '1', isDone: true, title: 'CSS'},
                            {id: '2', isDone: false, title: 'JS'}]}
                    setFilter={filterTasksCallback}
                    addTask={addTaskCallback}
                    removeList={removeListCallback}
                    addNewListHeader={addNewListHeaderCallback}
                    removeTask={removeTaskCallback}
                    changeTaskStatus={changeTaskStatusCallback}
                    setNewTaskTitle={setNewTaskTitleCallback}/>
            </>
        );
};
