import React from 'react';
import {string, func, arrayOf} from 'prop-types';
import {getGenres} from '../../utils/common.js';
import {Genre, MAX_GENRES_COUNTER} from '../../const.js';
import {movieType} from '../../types/types.js';

const GenresList = ({movies, selectedGenre, onGenreClick}) => {
  const genres = [Genre.ALL_GENRES, ...getGenres(movies)].slice(0, MAX_GENRES_COUNTER);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        const className = genre === selectedGenre ?
          `catalog__genres-item catalog__genres-item--active` :
          `catalog__genres-item`;

        return (
          <li key={genre} className={className}>
            <a href="#"
              className="catalog__genres-link"
              onClick={
                (evt) => {
                  evt.preventDefault();
                  onGenreClick(genre);
                }
              }
            >{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  movies: arrayOf(movieType).isRequired,
  selectedGenre: string.isRequired,
  onGenreClick: func.isRequired,
};

export default GenresList;
