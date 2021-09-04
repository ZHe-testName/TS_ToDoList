import { Checkbox, IconButton, ListItem } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import { ChangeEvent } from "react-transition-group/node_modules/@types/react";
import { TasksType } from "../AppWithRedux";
import EditableSpan from "./EditableSpan";

export type TasksPropsType = {
    toDoListId: string,
    task: TasksType,
    removeTask: (id: string, listId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, listId: string) => void,
    setNewTaskTitle: (newValue: string, taskId: string, listId: string) => void,
};

export const Task = React.memo((props: TasksPropsType) => {
    const taskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked;

        props.changeTaskStatus(props.task.id, newStatus, props.toDoListId);
    };

    const onChangeTitleHandler = (newValue: string) => {
        props.setNewTaskTitle(newValue, props.task.id, props.toDoListId);
    };
    
    return (
            <ListItem
                area-label='todo list item'
                key={`${props.task.id}`}
                className={props.task.isDone ? 'done-task' : 'uncomplete-task'}>
                    <Checkbox  
                        indeterminate
                        checked={props.task.isDone} 
                        onChange={e => taskStatusChangeHandler(e)}/>

                        <EditableSpan 
                                    title={props.task.title}
                                    newValue={onChangeTitleHandler}/>

                        <IconButton
                                style={{marginLeft: 'auto'}}
                                onClick={() => props.removeTask(props.task.id, props.toDoListId)}
                                area-label='delete'>
                                    <DeleteIcon 
                                                fontSize='small'/>
                        </IconButton>
            </ListItem>
        );
});