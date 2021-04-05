import React from 'react';
import {bool, func} from 'prop-types';
import {movieType} from '../../types/types.js';
import {ReviewForm} from '../../const.js';

const withReviewForm = (Component) => {
  class WithReviewForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        movie: null,
        comment: ``,
        rating: 0,
        isDisabled: true,
      };

      this.setMovie = this._setMovie.bind(this);
      this.handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
      this.handleFormSubmit = this._handleFormSubmit.bind(this);
      this.handleRatingChange = this._handleRatingChange.bind(this);
      this.handleCommentChange = this._handleCommentChange.bind(this);
    }

    componentDidUpdate(_, prevState) {
      if (prevState.comment !== this.state.comment || prevState.rating !== this.state.rating) {
        this.setState((state) => ({
          isDisabled: state.comment.length < ReviewForm.MIN_REVIEW_LENGTH || state.rating === 0,
        }));
      }
    }

    _setMovie(movie) {
      this.setState({movie});
    }

    _handleSubmitSuccess() {
      this.setState({
        comment: ``,
        rating: 0,
      });
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();

      const {postReview} = this.props;
      const {movie: {id}, comment, rating} = this.state;

      postReview(id, {rating, comment}, this.handleSubmitSuccess);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: +evt.target.value,
      });
    }

    _handleCommentChange(evt) {
      this.setState({
        comment: evt.target.value,
      });
    }

    render() {
      const {movie, isDisabled, comment, rating} = this.state;
      const {isLoading} = this.props;

      return (
        <Component
          {...this.props}
          setMovie={this.setMovie}
          movie={movie}
          comment={comment}
          rating={rating}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onSubmit={this.handleFormSubmit}
          onRatingChange={this.handleRatingChange}
          onCommentChange={this.handleCommentChange}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    movie: movieType.isRequired,
    postReview: func.isRequired,
    isLoading: bool.isRequired,
  };

  return WithReviewForm;
};

export default withReviewForm;
