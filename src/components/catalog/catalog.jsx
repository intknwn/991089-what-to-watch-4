import React from 'react';
import {connect} from 'react-redux';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';
import {string, bool, func, arrayOf} from 'prop-types';
import {movieType} from '../../types/types.js';
import {Genre, MAX_GENRES_COUNTER} from '../../const.js';
import {ActionCreator} from '../../store/action.js';
import {getGenres} from '../../utils/common.js';

const Catalog = ({
  genres,
  selectedGenre,
  onGenreClick,
  selectedByGenreMovies,
  isShowMore,
  onMovieCardClickHandler,
  onShowMoreClick
}) => {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList genres={genres} selectedGenre={selectedGenre} onGenreClick={onGenreClick}/>
      <MoviesList movies={selectedByGenreMovies} onMovieCardClickHandler={onMovieCardClickHandler} />
      {isShowMore && <ShowMoreButton onClick={onShowMoreClick}/>}
    </section>
  );
};

Catalog.propTypes = {
  genres: arrayOf(string).isRequired,
  selectedGenre: string.isRequired,
  selectedByGenreMovies: arrayOf(movieType).isRequired,
  isShowMore: bool.isRequired,
  onGenreClick: func.isRequired,
  onShowMoreClick: func.isRequired,
  onMovieCardClickHandler: func.isRequired,
};

const mapStateToProps = ({selectedGenre, selectedMovie, movies, moviesPerPage}) => {
  const genres = [Genre.ALL_GENRES, ...getGenres(movies)].slice(0, MAX_GENRES_COUNTER);
  const selectedByGenreMovies = selectedGenre === Genre.ALL_GENRES ? movies : movies.filter((mov) => mov.genre === selectedGenre);
  const selectedByGenreMoviesSliced = selectedByGenreMovies.slice(0, moviesPerPage);
  const isShowMore = selectedByGenreMovies.length > moviesPerPage;

  return {
    genres,
    selectedGenre,
    selectedMovie,
    selectedByGenreMovies: selectedByGenreMoviesSliced,
    isShowMore,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setMoviesGenre(genre));
    dispatch(ActionCreator.resetMoviesPerPage());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementMoviesPerPage());
  },
  onMovieCardClickHandler(movie) {
    dispatch(ActionCreator.selectMovie(movie));
  }
});

export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
