import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const movie = {
  name: `The Grand Budapest Hotel`,
  year: 2014,
  genre: `Drama`,
};

ReactDOM.render(
    <App movie={movie}/>,
    document.querySelector(`#root`)
);
