import React, {useState} from 'react';
import './App.css';
import { ToDoList } from './ToDoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type ListsType = {
    id: string,
    title: string,
    filter: string,
};

type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
};

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Hello world', isDone: false},
        {id: v1(), title: 'I am happy', isDone: true},
    ]);

    const [toDoListArr, setLists] = useState<Array<ListsType>>([
        {id: v1(), title: 'What to do', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ]);
    
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

    function filterTasks(value: FilterValuesType, id: string) {
        const targetList = toDoListArr.find(list => list.id === id);
        
        if (targetList){
            targetList.filter = value;
            setLists([...toDoListArr]);
        };
    };

    return (
        <div className="App">
            {toDoListArr.map(list => {
                                        let filtredTasksArr = tasks;

                                        if (list.filter === 'active'){
                                            filtredTasksArr = tasks.filter(t => !t.isDone); 
                                        };
                                    
                                        if (list.filter === 'completed'){
                                            filtredTasksArr = tasks.filter(t => t.isDone);
                                        };

                                        return(
                                            <ToDoList 
                                                    key={list.id}
                                                    id={list.id}  
                                                    title={list.title} 
                                                    tasks={filtredTasksArr}
                                                    removeTask={removeTask}
                                                    setFilter={filterTasks}
                                                    addTask={addTask}
                                                    changeTaskStatus={changeStatus}
                                                    filter={list.filter}/>
                                        );    
            })}
        </div>
    );
};

export default App;

// const task2 = [
//     {id: 1, title: 'Hello world', isDone: false},
//     {id: 2, title: 'I am happy', isDone: true},
//     {id: 3, title: 'Yo', isDone: false},
// ];

// class App extends React.Component{
//     constructor(props: Object){
//         super(props);
//     };

//     state = {
//         tasks: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: false},
//             {id: v1(), title: 'React', isDone: true},
//             {id: v1(), title: 'Hello world', isDone: false},
//             {id: v1(), title: 'I am happy', isDone: true},
//         ],

//         showingTasksArr: [],
//     };

//     removeTask(id: string) {
//         this.setState(state => {
//             return {
//                 tasks: this.state.tasks.filter(t => t.id !== id),
//             };
//         });
//     };

//     addTask(taskdesc: string){
//         const task = {id: v1(), title: taskdesc, isDone: false};
//         const tasksArr = [task, ...this.state.tasks];

//         this.setState(state => {
//             return {
//                 tasks: tasksArr,
//             };
//         });
//     }

//     changeStatus(id: string, isDone: boolean) {
//         const targetTask = this.state.tasks.find(task => task.id === id);

//         if (targetTask) {
//             targetTask.isDone = isDone;

//             this.setState(state => {
//                 return {
//                     tasks: [...this.state.tasks],
//                 };
//             });
//         };
//     };

//     // filterTasks(value: FilterValuesType) {
//     //     setFilter(value);
//     // };

//     render(){
//         return (
//             <div className="App">
//                 <ToDoList   title="I want to learn" 
//                             tasks={this.state.tasks}
//                             removeTask={this.removeTask}
//                             // setFilter={filterTasks}
//                             // addTask={addTask}
//                             // changeTaskStatus={changeStatus}
//                             // filter={filter}
//                             />
//                 {/* <ToDoList title="Songs" tasks={task2}/> */}
//             </div>
//         );
//     };
// };



