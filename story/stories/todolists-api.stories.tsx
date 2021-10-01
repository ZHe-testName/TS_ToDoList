import React, {useEffect, useState} from 'react'
import { todoListsAPI } from '../../src/api/todolists-api';

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

   // useEffect(() => {
   //    //Вторым параметром post запрос принеимает объект payload
   //    //в котром содержится нагружающая информация для сервака
   //    todoListsAPI.createToDoList('Blaster & Laser')
   //             .then(resultCode => setState(resultCode))
   // }, []);

   const sendToDoList = () => {
      todoListsAPI.createToDoList(listTitle)
               .then(resultCode => setState(resultCode))
               .then(() => setListTitle(''));
   }; 

   return (
      <>
         <div> {JSON.stringify(state)}</div>

         <div>
            <input 
               type="text" 
               placeholder='Enter list title'
               value={listTitle}
               onChange={e => setListTitle(e.currentTarget.value)}/>

            <button
               onClick={sendToDoList}>Create</button>
         </div>
      </>
   );
}
export const DeleteTodolist = () => {
   //8e9f204c-e7c2-476d-8e49-e6c97290da67
   const [state, setState] = useState<any>(null);
   const [listId, setListId] = useState<string>('');

   // useEffect(() => {
   //    todoListsAPI.deleteToDoLIst('91855799-6dc8-4ac6-8702-f51daff36db9')
   //             .then(resultCode => setState(resultCode))
   // }, []);

   const deleteListHandler = () => {
      todoListsAPI.deleteToDoLIst(listId)
               .then(resultCode => setState(resultCode))
               .then(() => setListId(''));
   };

   return (
      <>
         <div> {JSON.stringify(state)}</div>
      
         <div>
            <input 
               type="text" 
               placeholder='Enter list ID to delete'
               value={listId}
               onChange={e => setListId(e.currentTarget.value)}/>
      
            <button
               onClick={deleteListHandler}>Delete</button>
         </div>
      </>
   );     
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null);
   const [listId, setListId] = useState<string>('');
   const [newTitle, setNewTiltle] = useState<string>('');

   // useEffect(() => {
   //    todoListsAPI.updateToDoList('704c2985-14c2-4539-9ce7-48d124fb9bc3', 'MiniGun')
   //             .then(data => setState(data));
   // }, []);

   const updateListTilteHandler = () => {
      todoListsAPI.updateToDoList(listId, newTitle)
               .then(data => setState(data))
               .then(() => {
                  setListId('');
                  setNewTiltle('');
               });
   };

   return (
      <>
         <div> {JSON.stringify(state)}</div>
      
         <div>
            <input 
               type="text" 
               placeholder='Enter list ID to update'
               value={listId}
               onChange={e => setListId(e.currentTarget.value)}/>

            <input 
               type="text" 
               placeholder='Enter new list title'
               value={newTitle}
               onChange={e => setNewTiltle(e.currentTarget.value)}/>
      
            <button
               onClick={updateListTilteHandler}>Update</button>
         </div>
      </>
   ); 
}
