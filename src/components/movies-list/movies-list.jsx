import React from 'react';
import {arrayOf, func, number} from 'prop-types';
import {ShowMoreButton, MovieCard} from '../components.jsx';
import {withVideoPlayer} from '../../hocs/hocs.js';
import {movieType} from '../../types/types.js';
import {MOVIES_LIST_PLAYER_CONFIG} from '../../const.js';

const MovieCardWrapped = withVideoPlayer(MovieCard);

export const MoviesList = ({
  itemsToShow,
  itemsToShowChangeHandler,
  movies,
}) => {
  const moviesToShow = itemsToShow ? movies.slice(0, itemsToShow) : movies;
  const isShowMore = itemsToShow && movies.length > itemsToShow;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {moviesToShow.map((movie) =>
          <MovieCardWrapped
            key={movie.id}
            movie={movie}
            playerConfig={MOVIES_LIST_PLAYER_CONFIG}
          />
        )}
      </div>
      {isShowMore && <ShowMoreButton onClick={itemsToShowChangeHandler && itemsToShowChangeHandler}/>}
    </React.Fragment>
  );
};

MoviesList.propTypes = {
  itemsToShow: number,
  itemsToShowChangeHandler: func,
  movies: arrayOf(movieType).isRequired,
};

export default MoviesList;
