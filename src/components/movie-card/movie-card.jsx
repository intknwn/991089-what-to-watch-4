import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const MovieCard = ({movie, onMouseEnter, onMouseLeave, onClick, isPlaying}) => {
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
          <VideoPlayer
            src={movie.previewVid}
            width={280}
            height={175}
            poster={movie.previewImg}
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
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImg: PropTypes.string.isRequired,
    previewVid: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default MovieCard;
