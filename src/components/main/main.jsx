import React from 'react';
import {string, func, arrayOf, bool} from 'prop-types';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import {promoMovieType, movieType} from '../../types/types.js';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';

const Main = (props) => {
  const {
    movie,
    movies,
    onTitleClickHandler,
    selectedGenre,
    selectedByGenreMovies,
    isShowMore,
    onGenreClick,
    onShowMoreClick
  } = props;

  return (
    <div>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={movie.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
            </div>
          </div>
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt={`${movie.name} poster`} width={218} height={327} />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.year}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList movies={movies} selectedGenre={selectedGenre} onGenreClick={onGenreClick}/>
          <MoviesList movies={selectedByGenreMovies} onTitleClickHandler={onTitleClickHandler} />
          {isShowMore && <ShowMoreButton onClick={onShowMoreClick}/>}
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

Main.propTypes = {
  movie: promoMovieType.isRequired,
  movies: arrayOf(movieType).isRequired,
  onTitleClickHandler: func.isRequired,
  selectedGenre: string.isRequired,
  selectedByGenreMovies: arrayOf(movieType).isRequired,
  isShowMore: bool.isRequired,
  onGenreClick: func.isRequired,
  onShowMoreClick: func.isRequired,
};

export default Main;
