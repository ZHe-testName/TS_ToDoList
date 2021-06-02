import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { FilterValuesType } from '../App';
import AdditemInput from './AddItemInput';

const ToDoListWrap = styled.div`
    .active-filter{
        background-color: aquamarine;
    }
    
    .done-task{
        opacity: 0.5;
    }
`;

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    filter: string,
    id: string,
    removeTask: (id: string, listId: string) => void,
    setFilter: (value: FilterValuesType, id: string) => void,
    addTask: (taskDesc: string, listId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, listId: string) => void,
    removeList: (listId: string) => void,
};

export function ToDoList(props: PropsType) {
    const {title, tasks, filter, id, removeTask, removeList, setFilter, addTask, changeTaskStatus} = props;

    const removeListHandler = () => {
        removeList(id)
    };

    return (
        <ToDoListWrap>
            <h3>{title}</h3>
            <button onClick={removeListHandler}>x</button>

            <AdditemInput id={id} addTask={addTask}/>

            <ul>
                {
                    tasks.map(task => {
                        const taskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatus = e.currentTarget.checked;

                            changeTaskStatus(task.id, newStatus, id);
                        };

                        return (
                                <li 
                                    key={`${task.id}`}
                                    className={task.isDone ? 'done-task' : ''}>
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={task.isDone} 
                                            onChange={e => taskStatusChangeHandler(e)}/>
                                        <span>{task.title}</span>
                                        <button onClick={() => removeTask(task.id, id)}>X</button>
                                </li>
                            );
                    })
                }
            </ul>
            <div>
                <button 
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => setFilter('all', id)}>All</button>
                <button 
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => setFilter('active', id)}>Active</button>
                <button 
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => setFilter('completed', id)}>Completed</button>
            </div>
        </ToDoListWrap>
    );
}
