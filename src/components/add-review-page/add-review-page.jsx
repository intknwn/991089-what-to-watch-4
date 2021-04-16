import React from 'react';
import {Link} from 'react-router-dom';
import {arrayOf, bool, func, number, string} from 'prop-types';
import {Header} from '../components.jsx';
import {locationType, matchType, movieType, userType} from '../../types/types.js';
import {AppRoute, ClassName, ReviewForm} from '../../const.js';

class AddReviewPage extends React.PureComponent {

  componentDidMount() {
    const {match} = this.props;
    const id = +match.params.id;

    this.findMovieById(id);
  }

  componentDidUpdate(prevProps) {
    const {location, match} = this.props;
    const id = +match.params.id;

    if (prevProps.location !== location) {
      this.findMovieById(id);
    }
  }

  findMovieById(id) {
    if (Number.isInteger(id)) {
      const movie = this.props.movies.find((movieItem) => movieItem.id === id);

      if (movie) {
        this.props.setMovie(movie);

        return;
      }
    }

    history.push(AppRoute.MAIN);
  }

  renderAddReviewPage() {
    const {
      comment,
      isAuthorized,
      isDisabled,
      isLoading,
      movie: {
        id,
        name,
        posterImg,
        backgroundImg,
        backgroundColor,
      },
      onCommentChange,
      onRatingChange,
      onSubmit,
      rating,
      user
    } = this.props;

    return (
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImg} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header
            className={ClassName.MOVIE_PAGE_HEADER}
            isAuthorized={isAuthorized}
            user={user}
          >
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.MOVIE}/${id}`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>
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
  }

  render() {
    return this.props.movie ? this.renderAddReviewPage() : <></>;
  }
}

AddReviewPage.propTypes = {
  comment: string.isRequired,
  isAuthorized: bool.isRequired,
  isDisabled: bool.isRequired,
  isLoading: bool.isRequired,
  location: locationType.isRequired,
  match: matchType.isRequired,
  movie: movieType,
  movies: arrayOf(movieType).isRequired,
  onCommentChange: func.isRequired,
  onRatingChange: func.isRequired,
  onSubmit: func.isRequired,
  rating: number.isRequired,
  setMovie: func.isRequired,
  user: userType,
};

export default AddReviewPage;
