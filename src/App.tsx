import React, {useState} from 'react';

import { ToDoList } from './components/ToDoList';
import AdditemInput from './components/AddItemInput';
import './App.css';

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

type TasksObjPropsType = {
    [key: string]: Array<TasksType>,
};

function App() {
    const firstListId = v1(),
        secondListId = v1();

    const [tasksObj, setTasks] = useState<TasksObjPropsType>({
        [firstListId]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Hello world', isDone: false},
            {id: v1(), title: 'I am happy', isDone: true},
        ],
        [secondListId]: [
            {id: v1(), title: 'Suzuki GSX-R', isDone: true},
            {id: v1(), title: 'New notebook', isDone: false},
            {id: v1(), title: 'Something to eat', isDone: true},
        ],
    });

    const [toDoListArr, setLists] = useState<Array<ListsType>>([
        {id: firstListId, title: 'What to do', filter: 'active'},
        {id: secondListId, title: 'What to buy', filter: 'all'},
    ]);
    
    function removeTask(id: string, listId: string) {
        const taskArr = tasksObj[listId];
        const filteredTasks = taskArr.filter(t => t.id !== id);

        tasksObj[listId] = filteredTasks;

        setTasks({...tasksObj});
    };

    function addTask(taskdesc: string, listId: string){
        const taskArr = tasksObj[listId];
        const newTask = {id: v1(), title: taskdesc, isDone: false};

        tasksObj[listId] = [newTask, ...taskArr];

        setTasks({...tasksObj});
    }

    function changeStatus(id: string, isDone: boolean, listId: string) {
        const targetTask = tasksObj[listId].find(task => task.id === id);

        if (targetTask) {
            targetTask.isDone = isDone;

            setTasks({...tasksObj});
        };
    };

    function filterTasks(value: FilterValuesType, id: string) {
        const targetList = toDoListArr.find(list => list.id === id);
        
        if (targetList){
            targetList.filter = value;
            setLists([...toDoListArr]);
        };
    };

    function removeList(listId: string) {
        const list = toDoListArr.filter(list => list.id !== listId);

        setLists(list);

        delete tasksObj[listId];
    };

    function addToDoList(title: string) {
        const newToDoList: ListsType = {
            id: v1(),
            title: title,
            filter: 'all',
        };

        setLists([newToDoList, ...toDoListArr]);

        setTasks({
            ...tasksObj,
            [newToDoList.id]: [],
        });
    };

    return (
        <div className="App">
            <AdditemInput addItem={addToDoList}/>
            {toDoListArr.map(list => {
                                        let filtredTasksArr = tasksObj[list.id];

                                        if (list.filter === 'active'){
                                            filtredTasksArr = filtredTasksArr.filter(t => !t.isDone); 
                                        };
                                    
                                        if (list.filter === 'completed'){
                                            filtredTasksArr = filtredTasksArr.filter(t => t.isDone);
                                        };

                                        return(
                                            <ToDoList 
                                                    key={list.id}
                                                    id={list.id}  
                                                    title={list.title} 
                                                    filter={list.filter}
                                                    tasks={filtredTasksArr}
                                                    removeTask={removeTask}
                                                    setFilter={filterTasks}
                                                    addTask={addTask}
                                                    changeTaskStatus={changeStatus}
                                                    removeList={removeList}/>
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



