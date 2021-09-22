import React, {useEffect, useState} from 'react'
import { todoListsAPI } from '../api/todolists-api';

export default {
   title: 'API'
}

const obj = {
    addedDate: '2',
    deadline: 'l',
    priority: 9,
    startDate: 'ih',
    status: 0,
    title: 'string',
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
      todoListsAPI.deleteTask('91855799-6dc8-4ac6-8702-f51daff36db9', 'f0c2b985-31a5-4a4b-889c-c8cb38ede32a')
               .then(resultCode => setState(resultCode));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}
export const UpdateTask = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      todoListsAPI.updateTask('91855799-6dc8-4ac6-8702-f51daff36db9', '19e77038-c860-4fcc-891e-4d80e4416c3c', obj)
               .then(data => setState(data));
   }, []);

   return <div> {JSON.stringify(state)}</div>;
}