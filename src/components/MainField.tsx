import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { ListsType, MainFieldPropsType } from '../AppWithRedux';
import { AppRootStateType } from '../bll/state/store';
import AddItemInput from './AddItemInput';
import { ToDoList } from './ToDoList';
import { Redirect } from 'react-router-dom';

const MainField = (props: MainFieldPropsType) => {
    const {
            toDoListArr, 
            tasksObj, 
            demo,
            addToDoList, 
            addTask, 
            removeTask, 
            filterTasks, 
            changeStatus, 
            removeList,
            setNewTaskTitle,
            addNewListHeader,} = props;

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    console.log(isAuth);

    if (!isAuth){
        return <Redirect to={'/login'}/>
    };
            
    return (
        <>
            <Grid 
                container
                item
                xs={12}
                style={{marginTop: '15px'}}>
                    
                    <AddItemInput addItem={addToDoList}/>
                
            </Grid>

                    <Grid 
                        container
                        item
                        xs={12}
                        spacing={8}
                        style={{marginTop: '15px'}}>                    
                            {toDoListArr.map((list: ListsType) => {
                                let filtredTasksArr = tasksObj[list.id];

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
                                                        entityStatus={list.entityStatus}
                                                        demo={demo}
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
                                                        addNewListHeader={addNewListHeader}
                                                        />
                                            </Paper>
                                </Grid>);    
                            })}
                        </Grid>  
        </>
    );
};

export default MainField;