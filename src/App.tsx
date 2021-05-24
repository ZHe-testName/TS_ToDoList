import React, {useState} from 'react';
import './App.css';
import { ToDoList } from './ToDoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

// const task2 = [
//     {id: 1, title: 'Hello world', isDone: false},
//     {id: 2, title: 'I am happy', isDone: true},
//     {id: 3, title: 'Yo', isDone: false},
// ];

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Hello world', isDone: false},
        {id: v1(), title: 'I am happy', isDone: true},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');
    
    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    };

    function addTask(taskdesc: string){
        const task = {id: v1(), title: taskdesc, isDone: false};
        const tasksArr = [task, ...tasks];
        setTasks(tasksArr);
    }

    function changeStatus(id: string, isDone: boolean) {
        const targetTask = tasks.find(task => task.id === id);

        if (targetTask) {
            targetTask.isDone = isDone;

            setTasks([...tasks]);
        };
    };

    function filterTasks(value: FilterValuesType) {
        setFilter(value);
    };

    let filtredTasksArr = tasks;

    if (filter === 'active'){
        filtredTasksArr = tasks.filter(t => !t.isDone); 
    };

    if (filter === 'completed'){
        filtredTasksArr = tasks.filter(t => t.isDone);
    };


    return (
        <div className="App">
            <ToDoList   title="I want to learn" 
                        tasks={filtredTasksArr}
                        removeTask={removeTask}
                        setFilter={filterTasks}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={filter}/>
            {/* <ToDoList title="Songs" tasks={task2}/> */}
        </div>
    );
}

;

export default App;
