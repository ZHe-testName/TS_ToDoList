import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    setFilter: (value: FilterValuesType) => void,
    addTask: (taskDesc: string) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void;
    filter: string,
};

export function ToDoList(props: PropsType) {
    const {title, tasks, filter, removeTask, setFilter, addTask, changeTaskStatus} = props;

    let [newTaskDesc, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    
    const onKeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.key === 'Enter') {
            newTaskHandler()
        };
    };

    const newTaskHandler = () => {
        if (newTaskDesc.trim() !== ''){
            addTask(newTaskDesc);

            setTitle("");
            return;
        };

        setError('Tittle is required!');
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input  className={error ? 'error': ''}
                        value={newTaskDesc}
                        onChange={e => onChangeHandler(e)}
                        onKeyPress={e => onKeyPresHandler(e)}/>
                <button onClick={newTaskHandler}>+</button>

                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    tasks.map(task => {
                        const taskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatus = e.currentTarget.checked;

                            changeTaskStatus(task.id, newStatus);
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
                                        <button onClick={() => removeTask(task.id)}>X</button>
                                </li>
                            );
                    })
                }
            </ul>
            <div>
                <button 
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => setFilter('all')}>All</button>
                <button 
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => setFilter('active')}>Active</button>
                <button 
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => setFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}
