import React from 'react';
import {string, func, arrayOf} from 'prop-types';

const GenresList = ({genres, selectedGenre, onGenreClick}) => {
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
  genres: arrayOf(string).isRequired,
  selectedGenre: string.isRequired,
  onGenreClick: func.isRequired,
};

export default GenresList;
