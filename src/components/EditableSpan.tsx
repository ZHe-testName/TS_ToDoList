import React, {useState, ChangeEvent} from 'react';


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
                editMode ? <input 
                            value={localTitle}
                            onBlur={activateViewMode}
                            onChange={onChangeHandler}
                            autoFocus/>

                        : <span onDoubleClick={activateEditMode}>
                                {title}
                            </span>
            }
        </>
    );
};

export default EditableSpan;