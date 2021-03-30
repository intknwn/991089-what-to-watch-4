import {createSelector} from 'reselect';
import NameSpace from '../namespace.js';
import {getSelectedGenre, getSelectedMovie} from '../app/app-selectors.js';
import {Genre, MAX_GENRES_COUNTER, MAX_MORE_LIKE_THIS_MOVIES_COUNTER} from '../../const.js';
import {getGenres} from '../../utils/common.js';

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getReviews = (state) => state[NameSpace.DATA].reviews;

export const getMoviesByGenre = createSelector(
    getMovies,
    getSelectedGenre,
    (movies, selectedGenre) => selectedGenre === Genre.ALL_GENRES ?
      movies :
      movies.filter((movie) => movie.genre === selectedGenre)
);

export const getMovieGenres = createSelector(
    getMovies,
    (movies) => [Genre.ALL_GENRES, ...getGenres(movies)].slice(0, MAX_GENRES_COUNTER)
);

export const getSimilarMovies = createSelector(
    getMoviesByGenre,
    getSelectedMovie,
    (moviesByGenre, selectedMovie) => selectedMovie ?
      moviesByGenre
      .filter((movie) => movie.id !== selectedMovie.id)
      .slice(0, MAX_MORE_LIKE_THIS_MOVIES_COUNTER) :
      []
);

