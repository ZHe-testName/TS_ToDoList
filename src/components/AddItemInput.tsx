import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '@material-ui/core';

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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    
    const onKeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.key === 'Enter'){
            newTaskHandler();
        };
    }

    return (
        <div>
            <input  className={error ? 'error': ''}
                    value={title}
                    onChange={e => onChangeHandler(e)}
                    onKeyPress={e => onKeyPresHandler(e)}/>
            <Button onClick={newTaskHandler}
                    variant='contained'
                    color='primary'>+</Button>

            {error && <div className='error_message'>{error}</div>}
        </div>
    );
};

export default AddItemInput;