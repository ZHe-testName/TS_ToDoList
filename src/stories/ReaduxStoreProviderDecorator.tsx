import React from 'react';
import { Provider } from "react-redux";
import { store } from "../bll/state/store";

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
    return <Provider store={store}>{storyFn()}</Provider> ;
};