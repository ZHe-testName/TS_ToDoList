import React from 'react';
import AppWithRedux from './AppWithRedux';
import { ReaduxStoreProviderDecorator } from './stories/ReaduxStoreProviderDecorator';


//поле decorator предоставляет storybook-у декоратор
//и он автоматически поймет что вызов компоненты обернуть декоратор
export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorator: ReaduxStoreProviderDecorator,
};

export const AppWithReduxBasicExample = () => {
    return <AppWithRedux />;
};