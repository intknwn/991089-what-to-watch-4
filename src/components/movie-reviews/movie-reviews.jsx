import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MovieReviews = ({reviews}) => {
  const groupReviews = (movieReviews) => {
    return movieReviews.reduce((acc, item) => {
      const lastArrayItem = acc[acc.length - 1];

      if (lastArrayItem.length < 3) {
        lastArrayItem.push(item);
        return acc;
      }

      acc.push([item]);

      return acc;
    }, [[]]);
  };

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
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
};

export default MovieReviews;
