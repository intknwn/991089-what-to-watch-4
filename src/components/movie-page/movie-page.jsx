import React from 'react';
import {func, arrayOf} from 'prop-types';
import {Link} from 'react-router-dom';
import Tabs from '../tabs/tabs.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {movieType, matchType, locationType, reviewType} from '../../types/types.js';
import history from '../../history.js';
import {AppRoute, Tab, MAX_MORE_LIKE_THIS_MOVIES_COUNTER} from '../../const.js';

const TabsWrapped = withActiveItem(Tabs);
class MoviePage extends React.PureComponent {
  componentDidMount() {
    this._getMovieReviews();
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props;

    if (prevProps.location !== location) {
      const cb = () => window.scrollTo(0, 0);
      this._getMovieReviews(cb);
    }
  }

  _getMovieReviews(cb = () => {}) {
    const {match, movies, getMovieReviews} = this.props;
    const id = +match.params.id;

    if (Number.isInteger(id)) {
      const movie = movies.find((movieItem) => movieItem.id === id);

      if (movie) {
        getMovieReviews(id);
        cb();

        return;
      }
    }

    history.push(AppRoute.MAIN);
  }

  render() {
    const {movies, reviews, setFavoriteStatus, match} = this.props;
    const id = +match.params.id;

    if (!Number.isInteger(id)) {
      history.push(AppRoute.MAIN);
    }

    const movie = movies.find((movieItem) => movieItem.id === id);

    if (!movie) {
      return <></>;
    }

    const {
      name,
      backgroundImg,
      backgroundColor,
      posterImg,
      genre,
      year,
      isFavorite
    } = movie;

    const similarMovies = movies
    .filter(({id: movieId}) => movieId !== id && movie.genre === genre)
    .slice(0, MAX_MORE_LIKE_THIS_MOVIES_COUNTER);

    const onPlayClickHandler = () => {
      history.push(`${AppRoute.PLAYER}/${id}`);
    };

    const onMovieCardClickHandler = (movieId) => {
      history.push(`${AppRoute.MOVIE}/${movieId}`);
    };

    const myListClickHandler = () => {
      setFavoriteStatus(id, isFavorite);
    };

    return (
      <div>
        <section className="movie-card movie-card--full" style={{backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImg} alt={name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to="/" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>
              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="/img/avatar.jpg" alt="User avatar" width={63} height={63} />
                </div>
              </div>
            </header>
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>
                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={onPlayClickHandler}>
                    <svg viewBox="0 0 19 19" width={19} height={19}>
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button" onClick={myListClickHandler}>
                    {isFavorite ?
                      <svg viewBox="0 0 18 14" width={18} height={14}>
                        <use xlinkHref="#in-list" />
                      </svg> :
                      <svg viewBox="0 0 19 20" width={19} height={20}>
                        <use xlinkHref="#add" />
                      </svg>
                    }
                    <span>My list</span>
                  </button>
                  <Link to={`/movies/${id}/review`} className="btn movie-card__button">Add review</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterImg} alt={`${posterImg} poster`} width={218} height={327} />
              </div>
              <TabsWrapped
                activeItem={Tab.OVERVIEW}
                movie={movie}
                reviews={reviews}
              />
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesList movies={similarMovies} onMovieCardClickHandler={onMovieCardClickHandler}/>
          </section>
          <footer className="page-footer">
            <div className="logo">
              <Link to="/" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

MoviePage.propTypes = {
  movies: arrayOf(movieType).isRequired,
  reviews: arrayOf(reviewType).isRequired,
  match: matchType.isRequired,
  location: locationType.isRequired,
  getMovieReviews: func.isRequired,
  setFavoriteStatus: func.isRequired,
};

export default MoviePage;
