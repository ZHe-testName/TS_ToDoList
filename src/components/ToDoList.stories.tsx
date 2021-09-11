import React from 'react';
import { action } from '@storybook/addon-actions';
import { ToDoList } from './ToDoList';

export default {
    title: 'ToDoList Component',
    component: ToDoList,
};

const callback = action('Span new value was changed');

// export const EditableSpanBasicExamole = () => {
//     return <ToDoList 
//                 id='1' 
//                 title='Test Title'
//                 filter={list.filter}
//                 tasks={filtredTasksArr}
//                 removeTask={removeTask}
//                 setFilter={filterTasks}
//                 addTask={addTask}
//                 changeTaskStatus={changeStatus}
//                 removeList={removeList}
//                 setNewTaskTitle={setNewTaskTitle}
//                 addNewListHeader={addNewListHeader}/>;
// };
