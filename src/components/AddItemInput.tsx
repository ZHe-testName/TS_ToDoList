import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styled from 'styled-components';

const FormWrap = styled.div`
    .error{
        border: 1px solid red;
    }
    
        .error:focus{
        border: 1px solid red;
        outline: none;
        }
    
    .error_message{
        color: red;
    }
`;

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
        <FormWrap>
            <input  className={error ? 'error': ''}
                    value={title}
                    onChange={e => onChangeHandler(e)}
                    onKeyPress={e => onKeyPresHandler(e)}/>
            <button onClick={newTaskHandler}>+</button>

            {error && <div className='error_message'>{error}</div>}
        </FormWrap>
    );
};

export default AddItemInput;