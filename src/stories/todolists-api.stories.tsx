import axios from 'axios';
import React, {useEffect, useState} from 'react'

export default {
   title: 'API'
}

//Объект для настройки запросов на сервак
const settings = {
    //разрешает браузеру пересылать кукисы с браузера на другой домен
    // withCredentials: true,
    withCredentials: true,
};

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        "API-KEY": "797677fc-71e8-47d3-89ee-972f9e368c32",
    },
});

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
       instance.get("/todo-lists")
         .then(res => {
            setState(res.data);
         });

   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      //Вторым параметром post запрос принеимает объект payload
      //в котром содержится нагружающая информация для сервака
      instance.post("/todo-lists", {title: 'ZHekan Blaster ToDoList'})
         .then(res => {
            console.log(res);
            // setState(res.data);
         });
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   //8e9f204c-e7c2-476d-8e49-e6c97290da67
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      instance.delete("/todo-lists/8e9f204c-e7c2-476d-8e49-e6c97290da67")
         .then(res => {
            console.log(res);
            // setState(res.data);
         });
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
