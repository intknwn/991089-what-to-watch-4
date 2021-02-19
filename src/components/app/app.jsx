/* eslint-disable react/prop-types */
import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  const {movie} = props;

  return (
    <Main movie={movie}/>
  );
};

export default App;
