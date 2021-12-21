import React from 'react';
import Grid from '@material-ui/core/Grid';

import { ToDoList } from './components/ToDoList';
import AdditemInput from './components/AddItemInput';
import './App.css';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, Container, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { updateTaskTC, createTaskTC, deleteTaskTC, ServerTasksType } from './bll/task-reducer/task-reducer';
import { addToDoListTC, changeTodoListFilterAC, changeTodoListTitleTC, fetchToDoListThunkTC, removeToDoListTC } from './bll/todolist-reducer/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './bll/state/store';
import { useCallback, useEffect } from 'react'; 
import LinearProgress  from '@material-ui/core/LinearProgress/LinearProgress';
import ErrorSnackbar from './components/ErrorSnackbar';
import { Status } from './bll/app-reducer/app-reducer';
import {Route} from 'react-router-dom';
import MainField from './components/MainField';
import LoginForm from './components/LoginForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

// type ResponceType = {
//     data: {},
//     messages: string[],
//     fieldsErrors: [],
//     resultCode: number,
// };

export type ServerListType = {
    id: string,
    title: string,
    addedDate: string | null,
    order: number,
    entityStatus?: Status,
};

export type ListsType = {
    id: string,
    title: string,
    addedDate: string | null,
    order: number,
    filter: FilterValuesType,
    entityStatus: Status,
};

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
};

export type TasksObjPropsType = {
    [key: string]: Array<ServerTasksType>,
};

type AppType = {
    setToDoListThunkAC: () => void,
};

type AppPropsType = {
    //поле демо нужно чтобы при тестировании
    //через сторибук не обращатся к серваку а 
    //юзать наши подготовленные данные
    demo?: boolean,
};

export type MainFieldPropsType = {
    tasksObj: TasksObjPropsType,
    toDoListArr: ListsType[],
    demo: boolean,
    removeTask: (id: string, listId: string) => void,
    addTask: (title: string, listId: string) => void,
    changeStatus: (id: string, status: number, listId: string) => void,
    setNewTaskTitle: (newValue: string, taskId: string, listId: string) => void,
    filterTasks: (value: FilterValuesType, id: string) => void,
    removeList: (listId: string) => void,
    addToDoList: (title: string) =>  void,
    addNewListHeader: (newValue: string, listId: string) => void,
}

function AppWithRedux({demo = false}: AppPropsType) {
    //метод useState используется для перерисовки компонента
    //он принимает стартовое/новое значения стейта и возвращает массив в котром хранится переменная с 
    //состоянием и функция которая будет запускать перерисовку и перерисовывает компонент

    //но он толко принимает готовые состояния
    //их преобразованием занимаются отдельные функции
    //которые тоже лежат в компоненте и их может быть ооочень много и со сложной логикой

    //чтобы вынести логику управления состоянием есть библиотеки на подобие redux
    //но совремменный react уже тоже имеет подобный редаксу функционал

    //у него паявился хук useReducer он принимает reducer и стартовое состояние
    //и тоже возвращает массив с переменной нового состояния и функцию которая
    //диспатчит action в reducer

    //это позволяет вынести всю бизнес-логику из компоненты в bll

        // const [tasksObj, dispatcToTaskReducer] = useReducer(taskReducer, {
    //     [firstListId]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: false},
    //         {id: v1(), title: 'React', isDone: true},
    //         {id: v1(), title: 'Hello world', isDone: false},
    //         {id: v1(), title: 'I am happy', isDone: true},
    //     ],
    //     [secondListId]: [
    //         {id: v1(), title: 'Suzuki GSX-R', isDone: true},
    //         {id: v1(), title: 'New notebook', isDone: false},
    //         {id: v1(), title: 'Something to eat', isDone: true},
    //     ],
    // });

    // const [toDoListArr, dispatchToListsReducer] = useReducer(toDoListReducer, [
    //     {id: firstListId, title: 'What to do', filter: 'active'},
    //     {id: secondListId, title: 'What to buy', filter: 'all'},
    // ]);

    //если мы используем редакс то нам уже не нужны никакие хуки из реакта
    //вместо них используются useSelector & useDispatch из реакт-редакс библиотеки
    
    //useSelector исполбзуется чтобы выбрать чтото из чегото
    //в нвшем случае мы выбираем части сосотояния из стейта 
    //в типизации указывается в начале тип рут-стейта, а вторым аргументом тип 
    //интересующей нас подветки
    const tasksObj = useSelector<AppRootStateType, TasksObjPropsType>(state => state.tasks);
    const toDoListArr = useSelector<AppRootStateType, Array<ListsType>>(state => state.todolists);
    const status = useSelector<AppRootStateType, Status>(state => state.app.status);

    //вместо отдельных диспатчей редакс использует один общий
    const dispatch = useDispatch();

    useEffect(() => {
        if (demo){
            return;
        };
        
        dispatch(fetchToDoListThunkTC());
    }, []);

    //после мемоизации дочепних комонент лишние перерисовки досих пор происходят
    //по тому что при сравнинии пропсов получаеться что у нас в 
    //компоненту прилетают одинаковые колбеки
    //но в js все функции это объекты а два хоть сколько похожих объекта не 
    //равны друг другу
    //по этому контейнерная обертка реак мемо сравнивая входящие в пропсах колбеки 
    //постоянно получает новые хоть и одинаковые функции которые не равны 
    //и соответственно вызывает перерисовку

    //чтобы это по фиксить в реасте имеется хук useCallback

    //на вход он принимает собственно колбек первым аргументом и вторым массив зависимостей
    //в итоге мы получаем закешированую функцию которая при повторном прокидывании
    //через пропсы не создается заново а берется из кеша
    //что блокирует лишние перерисовки

    //в мссиве заувисимостей мы передаем то что может менятся в течении хода программы
    //чтобы при изменениях в зависимостях реакт заново
    //перекешировал эту функцию
    const removeTask = useCallback((id: string, listId: string) => {
        dispatch(deleteTaskTC(listId, id));
    }, [dispatch]);

    const addTask = useCallback((title: string, listId: string) => {
        dispatch(createTaskTC(listId, title))
    }, [dispatch]);

    const changeStatus = useCallback((id: string, status: number, listId: string) => {
        dispatch(updateTaskTC(listId, id, { status }));
    }, [dispatch]);

    const setNewTaskTitle = useCallback((newValue: string, taskId: string, listId: string) => {
        dispatch(updateTaskTC(listId, taskId, { title: newValue }));
    }, [dispatch]);


    const filterTasks = useCallback((value: FilterValuesType, id: string) => {
        const action = changeTodoListFilterAC(id, value);
        dispatch(action);
    }, [dispatch]);
    
    const removeList = useCallback((listId: string) => {    
        dispatch(removeToDoListTC(listId));
    }, [dispatch]);

    const addToDoList = useCallback((title: string) => {
        dispatch(addToDoListTC(title));
    }, [dispatch]);

    const addNewListHeader = useCallback((newValue: string, listId: string) => {
        dispatch(changeTodoListTitleTC(listId, newValue));
    }, [dispatch]);
    
    return (
        <div>
            <AppBar 
                position='fixed'>
                    <Toolbar>
                        <IconButton 
                                edge='start' 
                                color='inherit' 
                                aria-label='menu'><MenuIcon />
                        </IconButton>

                        <Typography 
                                variant='h6'>Todo Lists</Typography>

                        <Button 
                            style={{marginLeft: 'auto'}}
                            color='inherit'>Login</Button>
                    </Toolbar>

                    {
                        status === 'loading' && <LinearProgress />
                    }
            </AppBar>

            <Container 
                    style={{
                        marginTop: '100px',
                    }}
                    fixed>


            <Route exact path='/' render={() => <MainField {...{
                                                                    toDoListArr,
                                                                    tasksObj, 
                                                                    demo,
                                                                    addToDoList, 
                                                                    addTask, 
                                                                    removeTask, 
                                                                    filterTasks, 
                                                                    changeStatus, 
                                                                    removeList,
                                                                    setNewTaskTitle,
                                                                    addNewListHeader,
                                                                }}/>}/>

            <Route path='/login' render={() => <LoginForm />}/>

            </Container>

            <ErrorSnackbar />
        </div>
    );
};

export default AppWithRedux;