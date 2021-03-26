import React from 'react';
import {bool, func, node} from 'prop-types';
import {movieType} from '../../types/types.js';

const MovieCard = ({movie, onMouseEnter, onMouseLeave, onClick, isPlaying, children}) => {
  const {name, previewImg} = movie;

  const clickHandler = (evt) => {
    evt.preventDefault();
    onClick(movie);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onMouseEnter(movie)}
      onMouseLeave={onMouseLeave}
      onClick={clickHandler}
    >
      <div className="small-movie-card__image">
        {isPlaying ?
          children :
          <img src={previewImg} alt={name} width={280} height={175} />
        }
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: movieType.isRequired,
  onClick: func.isRequired,
  isPlaying: bool.isRequired,
  onMouseEnter: func.isRequired,
  onMouseLeave: func.isRequired,
  children: node.isRequired,
};

export default MovieCard;
