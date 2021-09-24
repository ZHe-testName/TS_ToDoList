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
   const [listTitle, setListTitle] = useState<string>('');

   useEffect(() => {
      //Вторым параметром post запрос принеимает объект payload
      //в котром содержится нагружающая информация для сервака
      todoListsAPI.createToDoList('Blaster & Laser')
               .then(resultCode => setState(resultCode))
   }, []);

   return (
      <>
         <div> {JSON.stringify(state)}</div>

         <div>
            <input 
               type="text" 
               placeholder='Incert list title'
               onChange={e => setListTitle(e.currentTarget.value)}/>

            <button
               onClick={() => {}}>Create</button>
         </div>
      </>
   );
}
export const DeleteTodolist = () => {
   //8e9f204c-e7c2-476d-8e49-e6c97290da67
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.deleteToDoLIst('91855799-6dc8-4ac6-8702-f51daff36db9')
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
