import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PlusOneIcon from '@material-ui/icons/PlusOne';

type PropsType = {
    addItem: (toDoListId: string) => void,
    disabled?: boolean,
};

//Сейчас в нашем приложении есть проблема
//при лбых изменениях в стейте глобальном реакт запрашивает для сравнения и перерисовки
//jsx у всех компонент

//Если преложение будет большим то при сравнении слишком большого количества данных с виртуал дом
//реакт будет сильно перегружаться и излишними вычеслениями и загружать прой и расходовать батарею

//Нужна оптимизация

//чтобы при одних и тех же пропсах не дергать компонеты вообще
//и не грузить лишним ядро реакта и вызывать сравнения и перерисовки только в нужных местах

//Тут на помощ приходит HOC React.memo()
//HOC - ето такие хай ордер компонентс(компонеты высшего порядка), это функции которые 
//принимают функциональную компоненту и возврващают ее обернутой в контейнерную.
//React.memo() = HOC которая проверяет входные пропсы и в случае отсутствия изменений не запрашивает jsx для сравнений
//и сответственно не грузит вычислениями проц

//она принимает нужнаю компоненту

const AddItemInput = React.memo((props: PropsType) => {
    const {addItem, disabled = false} = props;

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
        if (error !== null){
            setError(null);
        };

        if (e.key === 'Enter'){
            newTaskHandler();
        };
    }

    return (
            <Grid
                container>
                    <TextField 
                            disabled={disabled}
                            variant='outlined'
                            label='Typing there'
                            style={{marginRight: '20px'}} 
                            error={!!error}
                            value={title}
                            helperText={error}
                            onChange={e => onChangeHandler(e)}
                            onKeyPress={e => onKeyPresHandler(e)}/>

                            <Button 
                                disabled={disabled}
                                onClick={newTaskHandler}
                                variant='contained'
                                startIcon={<PlusOneIcon/>}
                                color='primary'
                                size='small'></Button>
            </Grid>
    );
});

export default AddItemInput;