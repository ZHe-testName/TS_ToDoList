import { action } from '@storybook/addon-actions';
import React from 'react';
import AddItemInput from '../components/AddItemInput';

//библиотека storybооk нужна чтобы проводить так называемое snapShot тестирование
//оно основано на внешнем виде наших компонент 
//так как у нас frontend разработка то это позволит контролировать поведение нашиш компонент 
//целиком
//ибо они проводят общение с dll и dal то нормальный внешний вид сигнализирует нам о том что 
//все происходит так как надо (или не надо)))

//storybook принимает объект в котором есть title и component

//title - это просто информация для пользователя
//component - сама компонента которую мы тестируем
export default {
    title: 'AddItemInput Component',
    component: AddItemInput,
};

//функция action имитирует вызов интересующего нас колбека
//и возвращает сообщение и результат вазова
const callback = action('Button "add" was pressed inside the form');

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemInput addItem={callback}/>
};

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemInput addItem={callback} disabled={true}/>
};