import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';

import { ToDoList } from './components/ToDoList';
import AdditemInput from './components/AddItemInput';
import './App.css';

import {v1} from 'uuid';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, Container, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { ServerTasksType } from './bll/task-reducer/task-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type ListsType = {
    id: string,
    title: string,
    filter: string,
};

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
};

export type TasksObjPropsType = {
    [key: string]: Array<ServerTasksType>,
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

    function setNewTaskTitle(newValue: string, taskId: string, listId: string){
        const targetTaskArray = tasksObj[listId];

        const targetTask = targetTaskArray.find(task => task.id === taskId);

        if (targetTask){
            targetTask.title = newValue;
            
            setTasks({...tasksObj});
        };
    };

    function addNewListHeader(newValue: string, listId: string) {
        const targetList = toDoListArr.find(list => list.id === listId);

        if (targetList){
            targetList.title = newValue;

            setLists([...toDoListArr]);
        };

    };

    return (
        <div>
            <AppBar 
                position='static'>
                    <Toolbar>
                        <IconButton 
                                edge='start' 
                                color='inherit' 
                                aria-label='menu'><MenuIcon />
                        </IconButton>

                        <Typography 
                                variant='h6'>News</Typography>

                        <Button 
                            style={{marginLeft: 'auto'}}
                            color='inherit'>Login</Button>
                    </Toolbar>
            </AppBar>

            <Container 
                    fixed>
                    <Grid 
                        container
                        item
                        xs={12}
                        style={{marginTop: '15px'}}>
                            
                            <AdditemInput addItem={addToDoList}/>
                        
                    </Grid>

                    <Grid 
                        container
                        item
                        xs={12}
                        spacing={8}
                        style={{marginTop: '15px'}}>                    
                            {toDoListArr.map(list => {
                                let filtredTasksArr = tasksObj[list.id];

                                if (list.filter === 'active'){
                                    filtredTasksArr = filtredTasksArr.filter(t => !t.isDone); 
                                };
                            
                                if (list.filter === 'completed'){
                                    filtredTasksArr = filtredTasksArr.filter(t => t.isDone);
                                };

                                return(
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={4}
                                        key={list.id}>
                                            <Paper
                                                className='list'
                                                style={{padding: '15px'}}
                                                elevation={2}>
                                                    <ToDoList 
                                                            id={list.id}  
                                                            title={list.title} 
                                                            filter={list.filter}
                                                            tasks={filtredTasksArr}
                                                            removeTask={removeTask}
                                                            setFilter={filterTasks}
                                                            addTask={addTask}
                                                            changeTaskStatus={changeStatus}
                                                            removeList={removeList}
                                                            setNewTaskTitle={setNewTaskTitle}
                                                            addNewListHeader={addNewListHeader}/>
                                            </Paper>
                                </Grid>);    
                            })}
                        </Grid>

            </Container>
        </div>
    );
};

// export default //App