import React from 'react';
import {bool, func} from 'prop-types';
import {movieType, refType, videoType} from '../../types/types.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';

const MovieCard = ({
  videoRef,
  movie,
  onMouseEnter,
  onMouseLeave,
  isPlaying,
  playerConfig
}) => {
  const {id, name, previewImg, previewVid} = movie;

  const clickHandler = (evt) => {
    evt.preventDefault();
    history.push(`${AppRoute.MOVIE}/${id}`);
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
          <video
            className="player__video"
            ref={videoRef}
            src={previewVid}
            poster={previewImg}
            {...playerConfig}
          /> :
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
  videoRef: refType,
  movie: movieType.isRequired,
  isPlaying: bool.isRequired,
  onMouseEnter: func.isRequired,
  onMouseLeave: func.isRequired,
  playerConfig: videoType.isRequired,
};

export default MovieCard;
