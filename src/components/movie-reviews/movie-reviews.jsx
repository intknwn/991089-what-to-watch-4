import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, func, number} from 'prop-types';
import moment from 'moment';
import {reviewType} from '../../types/types.js';
import {getReviews} from '../../store/data/data-selectors.js';
import {Operation} from '../../store/action.js';

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
class MovieReviews extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {getReviewsById, id} = this.props;
    getReviewsById(id);
  }

  render() {
    const {reviews} = this.props;

    if (!reviews.length) {
      return (
        <div>There is no reviews yet</div>
      );
    }

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
  }
}

MovieReviews.propTypes = {
  reviews: arrayOf(reviewType),
  id: number.isRequired,
  getReviewsById: func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  getReviewsById(id) {
    dispatch(Operation.getReviews(id));
  },
});

export {MovieReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
