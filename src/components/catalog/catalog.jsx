import React from 'react';
import {arrayOf, func, string} from 'prop-types';
import {GenresList, MoviesList} from '../components.jsx';
import {withShowMore} from '../../hocs/hocs.js';
import {movieType} from '../../types/types.js';
import {Genre, MOVIES_PER_PAGE} from '../../const.js';

const MoviesListWrapped = withShowMore(MoviesList);

class Catalog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isDefault = true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeItem !== prevProps.activeItem) {

      this.isDefault = !this.isDefault;
    }
  }

  render() {
    const {
      activeItem: genre,
      activeItemChangeHandler: onGenreClick,
      genres,
      movies,
    } = this.props;

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
          isDefault={this.isDefault}
          cb={(items) => items + MOVIES_PER_PAGE}
        />
      </section>
    );
  }
}

Catalog.propTypes = {
  activeItem: string.isRequired,
  activeItemChangeHandler: func.isRequired,
  genres: arrayOf(string).isRequired,
  movies: arrayOf(movieType).isRequired,
};

export default Catalog;
