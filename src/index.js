import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/movies.js';

const movie = {
  name: `The Grand Budapest Hotel`,
  year: 2014,
  genre: `Drama`,
};

ReactDOM.render(
    <App movie={movie} movies={movies}/>,
    document.querySelector(`#root`)
);
