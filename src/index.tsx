import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './bll/state/store';
import { HashRouter } from 'react-router-dom';

//basename используется для того чтобы пути к фпйлам сторились относительно
//определенной переменной окружения и тогда на хосте при перезагрузке страницы
//не на корневом урле у нас все будет нормально работать
ReactDOM.render(<Provider store={store}>
                    <HashRouter basename={process.env.PUBLIC_URL}>
                        <AppWithRedux />
                    </HashRouter>
                </Provider>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
