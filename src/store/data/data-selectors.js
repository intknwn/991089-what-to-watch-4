import {createSelector} from 'reselect';
import NameSpace from '../namespace.js';
import {getSelectedGenre} from '../app/app-selectors.js';
import {Genre, MAX_GENRES_COUNTER} from '../../const.js';
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
