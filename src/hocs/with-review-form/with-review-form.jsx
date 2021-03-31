import React from 'react';
import {bool, func} from 'prop-types';
import {movieType} from '../../types/types.js';
import {ReviewForm} from '../../const.js';

const withReviewForm = (Component) => {
  class WithReviewForm extends React.PureComponent {
    constructor(props) {
      super(props);

      const {id} = this.props.movie;

      this.state = {
        id,
        comment: ``,
        rating: 0,
        isDisabled: true,
      };

      this._handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    componentDidUpdate(_, prevState) {
      if (prevState.comment !== this.state.comment || prevState.rating !== this.state.rating) {
        this.setState((state) => ({
          isDisabled: state.comment.length < ReviewForm.MIN_REVIEW_LENGTH || state.rating === 0,
        }));
      }
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
      const {comment, rating, id} = this.state;

      postReview(id, {rating, comment}, this._handleSubmitSuccess);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: Number(evt.target.value),
      });
    }

    _handleCommentChange(evt) {
      this.setState({
        comment: evt.target.value,
      });
    }

    render() {
      const {isDisabled, comment, rating} = this.state;
      const {isLoading} = this.props;

      return (
        <Component
          {...this.props}
          comment={comment}
          rating={rating}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onSubmit={this._handleFormSubmit}
          onRatingChange={this._handleRatingChange}
          onCommentChange={this._handleCommentChange}
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
