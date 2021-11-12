import React, {useEffect, useState} from 'react'
import { todoListsAPI } from '../../api/todolists-api';

export default {
   title: 'API'
};

export const GetTasks = () => {
   const [state, setState] = useState<any>(null);
   const [listId, setListId] = useState<string>('');

   // useEffect(() => {
   //    todoListsAPI.getTasks(listId)
   //       .then(data => setState(data));
   // }, []);

   const getTaskHandler = () => {
      todoListsAPI.getTasks(listId)
               .then(data => setState(data))
               .then(() => setListId(''));
   };

   return (
      <>
         <div> {JSON.stringify(state)}</div>
         
         <div>
            <input 
               type="text" 
               placeholder='Enter target list ID'
               value={listId}
               onChange={e => setListId(e.currentTarget.value)}/>
            
            <button
               onClick={getTaskHandler}>Get Task</button>
         </div>
      </>
      );
};

export const CreateTask = () => {
   const [state, setState] = useState<any>(null);
   const [listId, setListId] = useState<string>('');
   const [taskTitle, setTaskTitle] = useState<string>('');

   // useEffect(() => {
   //    todoListsAPI.createTask(listId, taskTitle)
   //             .then(resultCode => setState(resultCode))
   // }, []);

   const createTaskHandler = () => {
      todoListsAPI.createTask(listId, taskTitle)
               .then(resultCode => setState(resultCode))
               .then(() => {
                  setListId('');
                  setTaskTitle('');
               });
   };

   return (
      <>
         <div> {JSON.stringify(state)}</div>
         
         <div>
            <input 
               type="text" 
               placeholder='Enter target list ID'
               value={listId}
               onChange={e => setListId(e.currentTarget.value)}/>

            <input 
               type="text" 
               placeholder='Enter task title'
               value={taskTitle}
               onChange={e => setTaskTitle(e.currentTarget.value)}/>
            
            <button
               onClick={createTaskHandler}>Create</button>
         </div>
      </>
      );
};

export const DeleteTask = () => {
   const [state, setState] = useState<any>(null);
   const [listId, setListId] = useState<string>('');
   const [taskId, setTaskId] = useState<string>('');

   // useEffect(() => {
   //    todoListsAPI.deleteTask('a0dc98fa-4c16-4d46-a052-919ec5693211', '1d72be0e-1531-4a0e-9270-76b0815db397')
   //             .then(resultCode => setState(resultCode));
   // }, []);

   const deleteTaskHandler = () => {
      todoListsAPI.deleteTask(listId, taskId)
               .then(resultCode => setState(resultCode))
               .then(() => {
                  setListId('');
                  setTaskId('');
               });
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

            <input 
               type="text" 
               placeholder='Enter list ID to delete'
               value={taskId}
               onChange={e => setTaskId(e.currentTarget.value)}/>
            
            <button
               onClick={deleteTaskHandler}>Delete</button>
         </div>
      </>
      );
};

export const UpdateTask = () => {
   const [state, setState] = useState<any>(null);
   const [listId, setListId] = useState<string>('');
   const [taskId, setTaskId] = useState<string>('');
   const [newTaskModel, setNewTaskModel] = useState<null | ModelType>(null);

   type ModelType = {
      addedDate: string,
      deadline: null | string,
      priority: number,
      startDate: string,
      status: number,
      title: string,
   };

//    const obj = {
//       addedDate: '2023-09-22T20:18:46.073',
//       deadline: null,
//       priority: 9,
//       startDate: '2023-09-22T20:18:46.073',
//       status: 0,
//       title: 'Im a new title from request',
//   };

  const setNewModel = (newTitle: string) => {
     setNewTaskModel({
      addedDate: '2023-09-22T20:18:46.073',
      deadline: null,
      priority: 9,
      startDate: '2023-09-22T20:18:46.073',
      status: 0,
      title: newTitle,
     });
  };

   // useEffect(() => {
   //    todoListsAPI.updateTask('a0dc98fa-4c16-4d46-a052-919ec5693211', 'f0c2b985-31a5-4a4b-889c-c8cb38ede32a', obj)
   //             .then(data => setState(data));
   // }, []);

   const updateTaskTitleHandler = () => {
      todoListsAPI.updateTask(listId, taskId, newTaskModel)
               .then(data => setState(data))
               .then(() => {
                  setListId('');
                  setTaskId('');
                  setNewModel('');
               });
   };

   return (
      <>
         <div> {JSON.stringify(state)}</div>
         
         <div>
            <input 
               type="text" 
               placeholder='Enter LIST ID to update'
               value={listId}
               onChange={e => setListId(e.currentTarget.value)}/>

            <input 
               type="text" 
               placeholder='Enter TASK ID to update'
               value={taskId}
               onChange={e => setTaskId(e.currentTarget.value)}/>

            <input 
               type="text" 
               placeholder='Enter new task title'
               value={newTaskModel?.title}
               onChange={e => setNewModel(e.currentTarget.value)}/>
            
            <button
               onClick={updateTaskTitleHandler}>Update Task Title</button>
         </div>
      </>
      );
};