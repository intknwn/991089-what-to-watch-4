import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer.js';
import {ActionCreator} from './store/action.js';
import App from './components/app/app.jsx';
import movies from './mocks/movies.js';

const movie = {
  name: `The Grand Budapest Hotel`,
  year: 2014,
  genre: `Drama`,
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(ActionCreator.setMovies(movies));

ReactDOM.render(
    <Provider store={store}>
      <App
        movie={movie}
      />
    </Provider>,
    document.querySelector(`#root`)
);
