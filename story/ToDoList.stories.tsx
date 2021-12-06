import React from 'react';
import { action } from '@storybook/addon-actions';
import { ToDoList } from '../components/ToDoList';

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
                    entityStatus='idle'
                    tasks={[{
                        
                        description: 'h',
                        title: 'string',
                        status: 0,
                        priority: 1,
                        startDate: 'tomorow',
                        deadline: 'yesterday',
                        id: 'id',
                        todoListId: 'string1',
                        order: 2,
                        addedDate: '34556',
                    }]}
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
                    entityStatus= 'loading'
                    tasks={[{
                        description: 'h',
                        title: 'string',
                        status: 0,
                        priority: 1,
                        startDate: 'tomorow',
                        deadline: 'yesterday',
                        id: 'id',
                        todoListId: 'string1',
                        order: 2,
                        addedDate: '34556',
                    }]}
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
                    entityStatus='idle'
                    tasks={[{
                        description: 'h',
                        title: 'string',
                        status: 0,
                        priority: 1,
                        startDate: 'tomorow',
                        deadline: 'yesterday',
                        id: 'id',
                        todoListId: 'string1',
                        order: 2,
                        addedDate: '34556',
                    },
                    {
                        description: 'g',
                        title: 'number',
                        status: 1,
                        priority: 2,
                        startDate: 'tomorow',
                        deadline: 'yesterday',
                        id: 'id1',
                        todoListId: 'string2',
                        order: 2,
                        addedDate: '345',
                    }]}
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
