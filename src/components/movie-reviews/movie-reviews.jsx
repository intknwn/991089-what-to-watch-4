import React from 'react';
import {arrayOf} from 'prop-types';
import moment from 'moment';
import {reviewType} from '../../types/types.js';
import {groupReviews} from '../../utils/common.js';

const MovieReviews = ({reviews}) => {
  const groupedReviews = groupReviews(reviews);

  return (
    <div className="movie-card__reviews movie-card__row">
      {groupedReviews.reduce((acc, group, index) => {
        return [...acc, (
          <div key={index} className="movie-card__reviews-col">
            {group.map((review) => {
              const {id, comment, rating, user, date} = review;
              const formattedRating = rating.toString().replace(/[.]/g, `,`);
              const formattedDate = moment(date).format(`MMMM D, YYYY`);

              return (
                <div key={id} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{comment}</p>
                    <footer className="review__details">
                      <cite className="review__author">{user.name}</cite>
                      <time className="review__date" dateTime={date}>{formattedDate}</time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{formattedRating}</div>
                </div>
              );
            })}
          </div>
        )];
      }, [])}
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: arrayOf(reviewType),
};

export default MovieReviews;

