import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {toast} from 'react-toastify';
import reducer from './store/reducer.js';
import {Operation, ActionCreator} from './store/action.js';
import App from './components/app/app.jsx';
import {createAPI} from './api/api.js';
import {AuthStatus} from './const.js';

import 'react-toastify/dist/ReactToastify.css';

const onError = (err) => toast.error(`Возникла непредвиденная ошибка: ${err}`);
const onUnauthorized = () => store.dispatch(ActionCreator.setAuthStatus(AuthStatus.NOT_AUTH));

const api = createAPI(onError, onUnauthorized);

toast.configure({
  position: `top-center`,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const startApp = () => Promise.all([
  store.dispatch(Operation.getMovies()),
  store.dispatch(Operation.getPromoMovie()),
])
.catch((err) => {
  toast.error(`${err.message}. Retrying...`, {
    onClose: () => startApp(),
  });
})
.then(() => store.dispatch(Operation.getAuthStatus()))
.catch(() => {})
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
});

startApp();


