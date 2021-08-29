import { combineReducers, createStore } from "redux";
import { taskReducer } from "../task-reducer/task-reducer";
import { toDoListReducer } from "../todolist-reducer/todolist-reducer";

//создаем общий рутовый редюсер для редакс

//он будет один для всех вызовов диспатча
//и он будет нам возвращать новый стейт
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: toDoListReducer,
});

//создаем новый стор на основе редюсеров
export const store = createStore(rootReducer);

//cздаем на  автоматически тип всего объекта состояня
export type AppRootStateType = ReturnType<typeof rootReducer>;

//для работы со стором с консоли
//создадим глобальную переменную с сылкой на стор

//@ts-ignore
window.store = store;