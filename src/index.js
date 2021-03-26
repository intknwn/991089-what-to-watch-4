import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer.js';
import {ActionCreator} from './store/action.js';
import App from './components/app/app.jsx';
import movies, {promoMovie} from './mocks/movies.js';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(ActionCreator.setMovies(movies));
store.dispatch(ActionCreator.setPromoMovie(promoMovie));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
