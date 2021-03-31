import React from 'react';
import {movieType} from '../../types/types.js';
import {ReviewForm} from '../../const.js';
import {bool, func, number, string} from 'prop-types';

export const AddReviewPage = (props) => {
  const {name, posterImg, backgroundImg} = props.movie;
  const {
    comment,
    rating,
    onRatingChange,
    onCommentChange,
    isDisabled,
    isLoading,
    onSubmit
  } = props;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImg} alt={name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
            </div>
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImg} alt={`${name} poster`} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={onSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {new Array(ReviewForm.MAX_RATE).fill(``).map((_, indexNumber) => {
                const index = indexNumber + 1;

                return (
                  <React.Fragment key={index}>
                    <input
                      className="rating__input"
                      id={`star-${index}`}
                      type="radio"
                      name="rating"
                      defaultValue={index}
                      checked={index === rating}
                      disabled={isLoading}
                      onChange={onRatingChange}
                    />
                    <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={comment}
              disabled={isLoading}
              onChange={onCommentChange}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isLoading || isDisabled}>Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>

  );
};

AddReviewPage.propTypes = {
  movie: movieType,
  comment: string.isRequired,
  rating: number.isRequired,
  onRatingChange: func.isRequired,
  onCommentChange: func.isRequired,
  isDisabled: bool.isRequired,
  isLoading: bool.isRequired,
  onSubmit: func.isRequired,
};

export default AddReviewPage;
