import React from 'react';
import { Provider } from "react-redux";
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';
import { store } from "../../bll/state/store";
import { taskReducer } from '../../bll/task-reducer/task-reducer';
import { toDoListReducer } from '../../bll/todolist-reducer/todolist-reducer';

//Для более презентабельного вида создадим стартовый стейт
//чтобы при демонстрации можно было спазу чтото показать
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: toDoListReducer,
});

const initialGlobalState = {
    tasks: {['firstListId']: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
            ],
            ['secondListId']: [
                {id: v1(), title: 'Suzuki GSX-R', isDone: true},
                {id: v1(), title: 'New notebook', isDone: false},
                {id: v1(), title: 'Something to eat', isDone: true},
            ]},

    todolists: [
        {id: 'firstListId', title: 'What to do', filter: 'active', order: 2, addedDate: '23'},
        {id: 'secondListId', title: 'What to buy', filter: 'all', order: 3, addedDate: '234'},
    ],
};

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

//Так как наше преложение работает через redux-context API
//нашей компоненте нужен store

//для ткстирования наших компонент которые используют store
//нам нужны декораторы
//функции-обертки которые будут предоставлять некоторый функционал и вызывать наши компоненты

//это соблюдает принципы SOLID в часности принцип открытости-закритости
//когда наша компонента открыта для расширения и закрыта для изменения

//мы оборачиваем наш вызов функции в Provider который дает нам доступ до store
//и мы можем протестировать компоненту

export const ReaduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider> ;
};