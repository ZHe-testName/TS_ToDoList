import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { todoListsAPI } from '../api/todolists-api';

export default {
   title: 'API'
}

//Объект для настройки запросов на сервак
// const settings = {
//     //разрешает браузеру пересылать кукисы с браузера на другой домен
//     // withCredentials: true,
//     withCredentials: true,
// };

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.getToDoLists()
         .then(data => setState(data));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      //Вторым параметром post запрос принеимает объект payload
      //в котром содержится нагружающая информация для сервака
      todoListsAPI.createToDoList('Blaster & Laser')
               .then(resultCode => setState(resultCode))
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const DeleteTodolist = () => {
   //8e9f204c-e7c2-476d-8e49-e6c97290da67
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.deleteToDoLIst('21c03f8b-69f7-43a0-a348-9746b5ab8335')
               .then(resultCode => setState(resultCode))
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.updateToDoList('704c2985-14c2-4539-9ce7-48d124fb9bc3', 'MiniGun')
               .then(data => setState(data));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
