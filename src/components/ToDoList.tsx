import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { FilterValuesType } from '../AppWithRedux';
import AdditemInput from './AddItemInput';
import EditableSpan from './EditableSpan';
import { Grid, List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useCallback } from 'react';
import { Task } from './Task';
import { useDispatch } from 'react-redux';
import { fetchTasksTC, ServerTasksType } from '../bll/task-reducer/task-reducer';
import { Status } from '../bll/app-reducer/app-reducer';

// type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean,
// };

type PropsType = {
    title: string,
    tasks: Array<ServerTasksType>,
    filter: string,
    id: string,
    demo?: boolean,
    entityStatus: Status,
    removeTask: (id: string, listId: string) => void,
    changeTaskStatus: (id: string, status: number, listId: string) => void,
    setNewTaskTitle: (newValue: string, taskId: string, listId: string) => void,
    setFilter: (value: FilterValuesType, id: string) => void,
    addTask: (taskDesc: string, listId: string) => void,
    removeList: (listId: string) => void,
    addNewListHeader: (newValue: string, listId: string) => void,
};

export const ToDoList = React.memo((props: PropsType) => {
    const { 
            title, 
            tasks, 
            filter, 
            id, 
            entityStatus,
            //это поле создается толео для деморежима
            //чтобы изолировать сторибук от сервера
            demo = false,
            removeTask, 
            removeList, 
            setFilter, 
            changeTaskStatus, 
            setNewTaskTitle, 
            addNewListHeader,
            addTask
                            } = props;

    let filtersdTasks: Array<ServerTasksType> = tasks;

    const dispatch = useDispatch();

    useEffect(() => {
        if(demo){
            return;
        }
        
        dispatch(fetchTasksTC(id));
    }, []);

    const removeListHandler = () => {
        removeList(id);
    };

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id]);

    const addNewListHeaderhandler = useCallback((newValue: string) => {
        addNewListHeader(newValue, id);
    }, [addNewListHeader, id]);

    const onAllClickHandler = useCallback(() => (setFilter('all', id)), [setFilter, id]);
    const onActiveClickHandler = useCallback(() => (setFilter('active', id)), [setFilter, id]);
    const onCompleteClickHandler = useCallback(() => (setFilter('completed', id)), [setFilter, id]);

    if (filter === 'active'){
        filtersdTasks = tasks.filter(t => !t.status); 
    };

    if (filter === 'completed'){
        filtersdTasks = tasks.filter(t => !!t.status);
    };

    return (
        <div>
            <Grid
                container
                direction='row'
                justify='space-between'
                style={{marginBottom: '15px'}}>
                    <Typography
                            variant='h4'>
                        <EditableSpan 
                                    title={title}
                                    newValue={addNewListHeaderhandler}/>
                    </Typography>

                    <Button  
                        disabled={entityStatus === 'loading'}
                        color='secondary'
                        size='small'
                        startIcon={<DeleteIcon />}  
                        onClick={removeListHandler}>Delete</Button>
            </Grid>

            <AdditemInput addItem={addTaskHandler} disabled={entityStatus === 'loading'}/>

            <List
                component='nav'
                area-label='todo list'>
                    {
                        filtersdTasks.map(task => {
                                            return <Task
                                                        key={task.id}
                                                        toDoListId={id}
                                                        task={task}
                                                        removeTask={removeTask}
                                                        changeTaskStatus={changeTaskStatus}
                                                        setNewTaskTitle={setNewTaskTitle} />
                        })
                    }
            </List>
            <Grid
                container
                direction='row'
                justify='space-around'>
                    <Button 
                        color='default'
                        variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                    <Button 
                        color='primary'
                        variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                    <Button 
                        color='secondary'
                        variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompleteClickHandler}>Completed</Button>
            </Grid>
        </div>
    );
});