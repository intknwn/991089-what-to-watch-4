import React from 'react';
import {convertRatingToScore} from '../../utils/rating.js';
import {movieType} from '../../types/types.js';

const MovieOverview = ({movie}) => {
  const {rating, score, description, director, cast} = movie;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{convertRatingToScore(rating)}</span>
          <span className="movie-rating__count">{`${score} ratings`}</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {cast}</strong></p>
      </div>
    </React.Fragment>
  );
};

MovieOverview.propTypes = {
  movie: movieType.isRequired,
};

export default MovieOverview;
