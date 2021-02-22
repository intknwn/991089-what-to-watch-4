/* eslint-disable react/prop-types */
import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {movie, movies} = props;

  return (
    <Main
      movie={movie}
      movies={movies}
      onTitleClickHandler={() => {}}
    />
  );
};

App.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
};

export default App;
