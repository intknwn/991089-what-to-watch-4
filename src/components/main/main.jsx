import React from 'react';
import {string, bool, func, arrayOf} from 'prop-types';
import {Link} from 'react-router-dom';
import Catalog from '../catalog/catalog.jsx';
import {movieType} from '../../types/types.js';
import history from '../../history.js';
import {AppRoute, Genre} from '../../const.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const CatalogWrapped = withActiveItem(Catalog);

const Main = ({
  promoMovie: {
    id,
    name,
    genre,
    year,
    backgroundImg,
    posterImg,
    isFavorite,
  },
  movies,
  genres,
  isAuthorized,
  setFavoriteStatus
}) => {
  const playClickHandler = () => history.push(`${AppRoute.PLAYER}/${id}`);
  const myListClickHandler = () => setFavoriteStatus(id, isFavorite);

  return (
    <div>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImg} alt={name} />
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
            {isAuthorized ?
              <div className="user-block__avatar">
                <Link to="/mylist"><img src="img/avatar.jpg" alt="User avatar" width={63} height={63} /></Link>
              </div> :
              <div className="user-block">
                <Link to="/sign-in" className="user-block__link">Sign in</Link>
              </div>
            }
          </div>
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={posterImg} alt={`${name} poster`} width={218} height={327} />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={playClickHandler}>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <CatalogWrapped
          movies={movies}
          genres={genres}
          activeItem={Genre.ALL_GENRES}
        />
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
  promoMovie: movieType.isRequired,
  movies: arrayOf(movieType).isRequired,
  genres: arrayOf(string).isRequired,
  isAuthorized: bool.isRequired,
  setFavoriteStatus: func.isRequired,
};

export default Main;
