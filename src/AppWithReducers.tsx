import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';

import { ToDoList } from './components/ToDoList';
import AdditemInput from './components/AddItemInput';
import './App.css';

import {v1} from 'uuid';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, Container, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { useReducer } from 'react';
import { addTaskAC, changeTaskDescriptionAC, changeTaskStatusAC, removeTaskAC, taskReducer } from './bll/task-reducer/task-reducer';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, toDoListReducer } from './bll/todolist-reducer/todolist-reducer';

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
    [key: string]: Array<TasksType>,
};

function AppWithReducers() {
    const firstListId = v1(),
        secondListId = v1();
    //метод useState используется для перерисовки компонента
    //он принимает стартовое/новое значения стейта и возвращает массив в котром хранится переменная с 
    //состоянием и функция которая будет запускать перерисовку и перерисовывает компонент

    //но он толко принимает готовые состояния
    //их преобразованием занимаются отдельные функции
    //которые тоже лежат в компоненте и их может быть ооочень много и со сложной логикой

    //чтобы вынести логику управления состоянием есть библиотеки на подобие redux
    //но совремменный react уже тоже имеет подобный редаксу функционал

    //у него паявился хук useReducer он принимает reducer и стартовое состояние
    //и тоже возвращает массив с переменной нового состояния и функцию которая
    //диспатчит action в reducer

    //это позволяет вынести всю бизнес-логику из компоненты в bll

    const [tasksObj, dispatcToTaskReducer] = useReducer(taskReducer, {
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

    const [toDoListArr, dispatchToListsReducer] = useReducer(toDoListReducer, [
        {id: firstListId, title: 'What to do', filter: 'active'},
        {id: secondListId, title: 'What to buy', filter: 'all'},
    ]);
    
    function removeTask(id: string, listId: string) {
        const action = removeTaskAC(listId, id);
        dispatcToTaskReducer(action);
    };

    function addTask(taskdesc: string, listId: string){
        const action = addTaskAC(taskdesc, listId);
        dispatcToTaskReducer(action);
    }

    function changeStatus(id: string, isDone: boolean, listId: string) {
        const action = changeTaskStatusAC(listId, id, isDone);
        dispatcToTaskReducer(action);
    };

    function setNewTaskTitle(newValue: string, taskId: string, listId: string){
        const action = changeTaskDescriptionAC(listId, taskId, newValue);
        dispatcToTaskReducer(action);
    };


    function filterTasks(value: FilterValuesType, id: string) {
        const action = changeTodoListFilterAC(id, value);
        dispatchToListsReducer(action);
    };
    
    function removeList(listId: string) {
        const action = removeTodoListAC(listId);
        dispatchToListsReducer(action);
        dispatcToTaskReducer(action);
    };

    function addToDoList(title: string) {
        const action =  addTodoListAC(title);
        dispatchToListsReducer(action);
        dispatcToTaskReducer(action);
    };

    function addNewListHeader(newValue: string, listId: string) {
        const action = changeTodoListTitleAC(listId, newValue);
        dispatchToListsReducer(action);
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

export default AppWithReducers;