import React from 'react';
import {bool, func} from 'prop-types';
import {Link} from 'react-router-dom';
import {movieType, refType, videoType} from '../../types/types.js';
import {AppRoute} from '../../const.js';
import history from '../../history.js';

const MovieCard = ({
  isPlaying,
  movie,
  onMouseEnter,
  onMouseLeave,
  playerConfig,
  videoRef,
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
        {
          isPlaying ?
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
        <Link className="small-movie-card__link" to={`${AppRoute.MOVIE}/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  isPlaying: bool.isRequired,
  movie: movieType.isRequired,
  onMouseEnter: func.isRequired,
  onMouseLeave: func.isRequired,
  playerConfig: videoType.isRequired,
  videoRef: refType,
};

export default MovieCard;
