import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

import { FilterValuesType } from '../App';
import AdditemInput from './AddItemInput';
import EditableSpan from './EditableSpan';
import { Grid, List, ListItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
    setNewTaskTitle: (newValue: string, taskId: string, listId: string) => void,
    addNewListHeader: (newValue: string, listId: string) => void,
};

export function ToDoList(props: PropsType) {
    const {title, tasks, filter, id, removeTask, removeList, setFilter, changeTaskStatus} = props;

    const removeListHandler = () => {
        removeList(id);
    };

    const addTask = (title: string) => {
        props.addTask(title, id);
    };

    const addNewListHeader = (newValue: string) => {
        props.addNewListHeader(newValue, id);
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
                                    newValue={addNewListHeader}/>
                    </Typography>

                    <Button  
                        color='secondary'
                        size='small'
                        startIcon={<DeleteIcon />}  
                        onClick={removeListHandler}>Delete</Button>
            </Grid>

            <AdditemInput addItem={addTask}/>

            <List
                component='nav'
                area-label='todo list'>
                    {
                        tasks.map(task => {
                            const taskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatus = e.currentTarget.checked;

                                changeTaskStatus(task.id, newStatus, id);
                            };

                            const onChangeTitleHandler = (newValue: string) => {
                                props.setNewTaskTitle(newValue, task.id, id);
                            };
                            
                            return (
                                    <ListItem
                                        area-label='todo list item'
                                        key={`${task.id}`}
                                        className={task.isDone ? 'done-task' : 'uncomplete-task'}>
                                            <Checkbox  
                                                indeterminate
                                                checked={task.isDone} 
                                                onChange={e => taskStatusChangeHandler(e)}/>

                                                <EditableSpan 
                                                            title={task.title}
                                                            newValue={onChangeTitleHandler}/>

                                                <IconButton
                                                        style={{marginLeft: 'auto'}}
                                                        onClick={() => removeTask(task.id, id)}
                                                        area-label='delete'>
                                                            <DeleteIcon 
                                                                        fontSize='small'/>
                                                </IconButton>
                                    </ListItem>
                                );
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
                        onClick={() => setFilter('all', id)}>All</Button>
                    <Button 
                        color='primary'
                        variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={() => setFilter('active', id)}>Active</Button>
                    <Button 
                        color='secondary'
                        variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => setFilter('completed', id)}>Completed</Button>
            </Grid>
        </div>
    );
}


