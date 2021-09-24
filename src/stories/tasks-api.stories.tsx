import React, {useEffect, useState} from 'react'
import { todoListsAPI } from '../api/todolists-api';

export default {
   title: 'API'
}

const obj = {
    addedDate: '2023-09-22T20:18:46.073',
    deadline: null,
    priority: 9,
    startDate: '2023-09-22T20:18:46.073',
    status: 0,
    title: 'Im a new title from request',
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.getTasks('a0dc98fa-4c16-4d46-a052-919ec5693211')
         .then(data => setState(data));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const CreateTask = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.createTask('a0dc98fa-4c16-4d46-a052-919ec5693211', 'Fighter Lead')
               .then(resultCode => setState(resultCode))
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const DeleteTask = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.deleteTask('a0dc98fa-4c16-4d46-a052-919ec5693211', '1d72be0e-1531-4a0e-9270-76b0815db397')
               .then(resultCode => setState(resultCode));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const UpdateTask = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.updateTask('a0dc98fa-4c16-4d46-a052-919ec5693211', 'f0c2b985-31a5-4a4b-889c-c8cb38ede32a', obj)
               .then(data => setState(data));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}