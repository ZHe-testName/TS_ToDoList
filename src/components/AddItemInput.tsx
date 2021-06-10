import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PlusOneIcon from '@material-ui/icons/PlusOne';

type PropsType = {
    addItem: (toDoListId: string) => void,
};

function AddItemInput(props: PropsType) {
    const {addItem} = props;

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const newTaskHandler = () => {
        if (title.trim() !== ''){
            addItem(title);

            setTitle("");
            return;
        };

        setError('Tittle is required!');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTitle(e.currentTarget.value);
    
    const onKeyPresHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        setError(null);

        if (e.key === 'Enter'){
            newTaskHandler();
        };
    }

    return (
            <Grid
                container>
                    <TextField 
                            variant='outlined'
                            label='Typing there'
                            style={{marginRight: '20px'}} 
                            error={!!error}
                            value={title}
                            helperText={error}
                            onChange={e => onChangeHandler(e)}
                            onKeyPress={e => onKeyPresHandler(e)}/>

                            <Button 
                                onClick={newTaskHandler}
                                variant='contained'
                                startIcon={<PlusOneIcon/>}
                                color='primary'
                                size='small'></Button>
            </Grid>
    );
};

export default AddItemInput;