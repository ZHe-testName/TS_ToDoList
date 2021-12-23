import { Checkbox, IconButton, ListItem } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import { useSelector } from "react-redux";
import { ChangeEvent } from "react-transition-group/node_modules/@types/react";
import { Status } from "../bll/app-reducer/app-reducer";
import { AppRootStateType } from "../bll/state/store";
import { ServerTasksType } from "../bll/task-reducer/task-reducer";
import EditableSpan from "./EditableSpan";

export type TasksPropsType = {
    toDoListId: string,
    task: ServerTasksType,
    removeTask: (id: string, listId: string) => void,
    changeTaskStatus: (id: string, status: number, listId: string) => void,
    setNewTaskTitle: (newValue: string, taskId: string, listId: string) => void,
};

export const Task = React.memo((props: TasksPropsType) => {
    const status = useSelector<AppRootStateType, Status>(state => state.app.status);
 
    const taskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked;

        props.changeTaskStatus(props.task.id, +newStatus, props.toDoListId);
    };

    const onChangeTitleHandler = (newValue: string) => {
        props.setNewTaskTitle(newValue, props.task.id, props.toDoListId);
    };
    
    return (
            <ListItem
                area-label='todo list item'
                key={`${props.task.id}`}
                className={!!props.task.status ? 'done-task' : 'uncomplete-task'}>
                    <Checkbox  
                            indeterminate
                            checked={!!props.task.status} 
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