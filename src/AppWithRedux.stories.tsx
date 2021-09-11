import React from 'react';
import AppWithRedux from './AppWithRedux';
import { ReaduxStoreProviderDecorator } from './stories/ReaduxStoreProviderDecorator';


//поле decorators предоставляет storybook-у декоратор
//и он автоматически поймет что вызов компоненты обернуть декоратор
export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReaduxStoreProviderDecorator],
};

export const AppWithReduxBasicExample = () => {
    return <AppWithRedux />;
};