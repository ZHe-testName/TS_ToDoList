import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "../app-reducer/app-reducer";
import { taskReducer } from "../task-reducer/task-reducer";
import { toDoListReducer } from "../todolist-reducer/todolist-reducer";

//создаем общий рутовый редюсер для редакс

//он будет один для всех вызовов диспатча
//и он будет нам возвращать новый стейт
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: toDoListReducer,
    app: appReducer,
});

//создаем новый стор на основе редюсеров
//добавляем промежуточный слой для thunk
export const store = createStore(rootReducer, applyMiddleware(thunk));

//cздаем на  автоматически тип всего объекта состояня
export type AppRootStateType = ReturnType<typeof rootReducer>;

//для работы со стором с консоли
//создадим глобальную переменную с сылкой на стор

//@ts-ignore
window.store = store;