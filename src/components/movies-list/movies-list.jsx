import React from 'react';
import {arrayOf, func, number} from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {movieType} from '../../types/types.js';
import {MOVIES_LIST_PLAYER_CONFIG} from '../../const.js';


const MovieCardWrapped = withVideoPlayer(MovieCard);

export const MoviesList = ({movies, itemsToShow, itemsToShowChangeHandler}) => {
  const moviesToShow = itemsToShow ? movies.slice(0, itemsToShow) : movies;
  const isShowMore = movies.length > itemsToShow;

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
      {isShowMore && <ShowMoreButton onClick={itemsToShowChangeHandler}/>}
    </React.Fragment>
  );
};

MoviesList.propTypes = {
  movies: arrayOf(movieType).isRequired,
  itemsToShow: number,
  itemsToShowChangeHandler: func,
};

export default MoviesList;
