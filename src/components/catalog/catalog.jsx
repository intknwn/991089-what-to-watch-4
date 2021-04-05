import React from 'react';
import {string, func, arrayOf} from 'prop-types';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import withShowMore from '../../hocs/with-show-more/with-show-more.jsx';
import {movieType} from '../../types/types.js';
import {Genre, MOVIES_PER_PAGE} from '../../const.js';

const MoviesListWrapped = withShowMore(MoviesList);

const Catalog = ({
  movies,
  genres,
  activeItem: genre,
  activeItemChangeHandler: onGenreClick,
}) => {
  const selectedByGenreMovies = genre && genre !== Genre.ALL_GENRES ?
    movies.filter((movie) => movie.genre === genre) :
    movies;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList
        genres={genres}
        selectedGenre={genre}
        onGenreClick={onGenreClick}
      />
      <MoviesListWrapped
        movies={selectedByGenreMovies}
        itemsToShow={MOVIES_PER_PAGE}
        cb={(items) => items + MOVIES_PER_PAGE}
      />
    </section>
  );
};

Catalog.propTypes = {
  movies: arrayOf(movieType).isRequired,
  genres: arrayOf(string).isRequired,
  activeItem: string.isRequired,
  activeItemChangeHandler: func.isRequired,
};

export default Catalog;
