import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({movie, onHover, onClick}) => {
  const {name, previewImg} = movie;

  return (
    <article onMouseEnter={() => onHover(movie)} className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={previewImg} alt={name} width={280} height={175} />
      </div>
      <h3 onClick={onClick} className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImg: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default MovieCard;
