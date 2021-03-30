import React from 'react';
import {connect} from 'react-redux';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';
import {string, bool, func, arrayOf} from 'prop-types';
import {movieType} from '../../types/types.js';
import {ActionCreator} from '../../store/action.js';
import {getMoviesByGenre, getMovieGenres} from '../../store/data/data-selectors.js';
import {getSelectedMovie, getSelectedGenre, getMoviesPerPage} from '../../store/app/app-selectors.js';

const Catalog = ({
  genres,
  selectedGenre,
  onGenreClick,
  selectedByGenreMovies,
  isShowMore,
  onMovieCardClick,
  onShowMoreClick
}) => {
  const onMovieCardClickHandler = (movie) => {
    onMovieCardClick(movie);
    window.scrollTo(0, 0);
  };

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
  onMovieCardClick: func.isRequired,
};

const mapStateToProps = (state) => {
  const selectedByGenreMovies = getMoviesByGenre(state);
  const moviesPerPage = getMoviesPerPage(state);
  const isShowMore = selectedByGenreMovies.length > moviesPerPage;

  return {
    genres: getMovieGenres(state),
    selectedGenre: getSelectedGenre(state),
    selectedMovie: getSelectedMovie(state),
    selectedByGenreMovies: selectedByGenreMovies.slice(0, moviesPerPage),
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
  onMovieCardClick(movie) {
    dispatch(ActionCreator.selectMovie(movie));
  }
});

export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
