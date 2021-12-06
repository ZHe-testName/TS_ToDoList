import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { v1 } from 'uuid';
import { appReducer } from '../../src/bll/app-reducer/app-reducer';
import { store } from "../../src/bll/state/store";
import { taskReducer } from '../../src/bll/task-reducer/task-reducer';
import { toDoListReducer } from '../../src/bll/todolist-reducer/todolist-reducer';

//Для более презентабельного вида создадим стартовый стейт
//чтобы при демонстрации можно было спазу чтото показать
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: toDoListReducer,
    app: appReducer,
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
        {id: 'firstListId', title: 'What to do', filter: 'active', entityStatus: 'idle', order: 2, addedDate: '23'},
        {id: 'secondListId', title: 'What to buy', filter: 'all', entityStatus: 'loading', order: 3, addedDate: '234'},
    ],
    app: {
        error: null,
        status: 'idle',
    },
};

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType, applyMiddleware(thunk));

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