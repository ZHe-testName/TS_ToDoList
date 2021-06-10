import React, {useState, ChangeEvent} from 'react';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';


type EditableSpanPropsType = {
    title: string,
    newValue: (newValue: string) => void, 
};

function EditableSpan(props: EditableSpanPropsType){
    const {title, newValue} = props;

    
    const [editMode, setEditMode] = useState(false);
    const [localTitle, setTitle] = useState('');


    const activateEditMode = () => {
        setEditMode(true);

        setTitle(title);
    };

    const activateViewMode = () => {
        setEditMode(false);

        newValue(localTitle);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return (
        <>
            {
                editMode ? <TextField 
                            value={localTitle}
                            onBlur={activateViewMode}
                            onChange={onChangeHandler}
                            autoFocus/>

                        : <Box
                                onDoubleClick={activateEditMode}>{title}</Box>
            }
        </>
    );
};

export default EditableSpan;