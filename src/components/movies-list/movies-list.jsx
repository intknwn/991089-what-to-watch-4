import React from 'react';
import {func, arrayOf} from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {movieType} from '../../types/types.js';
import {MOVIES_LIST_PLAYER_CONFIG} from '../../const.js';

const MovieCardWrapped = withVideoPlayer(MovieCard);

export const MoviesList = ({movies, onMovieCardClickHandler}) => {

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) =>
        <MovieCardWrapped
          key={movie.name}
          movie={movie}
          playerConfig={MOVIES_LIST_PLAYER_CONFIG}
          onClick={onMovieCardClickHandler}
        />
      )}
    </div>
  );
};

MoviesList.propTypes = {
  movies: arrayOf(movieType).isRequired,
  onMovieCardClickHandler: func.isRequired,
};

export default MoviesList;
