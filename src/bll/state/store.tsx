import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "../app-reducer/app-reducer";
import authReducer from "../auth-reducer/auth-reducer";
import { taskReducer } from "../task-reducer/task-reducer";
import { toDoListReducer } from "../todolist-reducer/todolist-reducer";
import { configureStore } from "@reduxjs/toolkit";

//создаем общий рутовый редюсер для редакс

//он будет один для всех вызовов диспатча
//и он будет нам возвращать новый стейт
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: toDoListReducer,
    app: appReducer,
    auth: authReducer,
});

//создаем новый стор на основе редюсеров
//добавляем промежуточный слой для thunk
// export const store = createStore(rootReducer, applyMiddleware(thunk));

//для использования redux toolkit нужно его подключить
//он задает нам одинаковый стиль написания проектов
//он берет на себя все подключения редюсерров
//настройку типизации и прочее

//это как бы надстройка обертка над стором редакса

//для создания стора используется функция configureStore
//и в нее передается объект с настройками: наши редюсеры, помежуточные слои прочее...

export const store = configureStore({
    reducer: rootReducer,

    //для типизации редюсера в настройку промижуточного слоя передается функция
    //которая получить дефолтный промежуточный слой и добавляет в начало или конец наши собственные промежуточные слои
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

//cздаем на  автоматически тип всего объекта состояня
export type AppRootStateType = ReturnType<typeof rootReducer>;

//для работы со стором с консоли
//создадим глобальную переменную с сылкой на стор

//@ts-ignore
window.store = store;