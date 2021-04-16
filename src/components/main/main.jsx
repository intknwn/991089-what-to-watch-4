import React from 'react';
import {arrayOf, bool, func, string} from 'prop-types';
import {Catalog, Footer, Header} from '../components.jsx';
import {withActiveItem} from '../../hocs/hocs.js';
import {movieType, userType} from '../../types/types.js';
import {AppRoute, ClassName, Genre} from '../../const.js';
import history from '../../history.js';

const CatalogWrapped = withActiveItem(Catalog);

const Main = ({
  genres,
  isAuthorized,
  movies,
  promoMovie: {
    backgroundImg,
    genre,
    id,
    isFavorite,
    name,
    posterImg,
    year,
  },
  setFavoriteStatus,
  user,
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
        <Header
          className={ClassName.MOVIE_PAGE_HEADER}
          isAuthorized={isAuthorized}
          isEmpty={true}
          user={user}
        />
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
        <Footer />
      </div>
    </div>
  );
};

Main.propTypes = {
  genres: arrayOf(string).isRequired,
  isAuthorized: bool.isRequired,
  movies: arrayOf(movieType).isRequired,
  promoMovie: movieType.isRequired,
  setFavoriteStatus: func.isRequired,
  user: userType.isRequired,
};

export default Main;
