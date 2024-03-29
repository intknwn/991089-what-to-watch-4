import React from 'react';
import {bool, func} from 'prop-types';
import {movieType} from '../../types/types.js';
import {ReviewForm} from '../../const.js';
import history from '../../history.js';

const withReviewForm = (Component) => {
  class WithReviewForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        comment: ``,
        isDisabled: true,
        movie: null,
        rating: 0,
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

      history.goBack();
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
          comment={comment}
          isDisabled={isDisabled}
          isLoading={isLoading}
          movie={movie}
          onCommentChange={this.handleCommentChange}
          onRatingChange={this.handleRatingChange}
          onSubmit={this.handleFormSubmit}
          rating={rating}
          setMovie={this.setMovie}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    isLoading: bool.isRequired,
    movie: movieType.isRequired,
    postReview: func.isRequired,
  };

  return WithReviewForm;
};

export default withReviewForm;
