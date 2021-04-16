import {createSelector} from 'reselect';
import NameSpace from '../namespace.js';
import {Genre, MAX_GENRES_COUNTER} from '../../const.js';
import {getGenres} from '../../utils/common.js';

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getFavoriteMovies = (state) => state[NameSpace.DATA].favoriteMovies;

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getReviews = (state) => state[NameSpace.DATA].reviews;

export const getMovieGenres = createSelector(
    getMovies,
    (movies) => [Genre.ALL_GENRES, ...getGenres(movies)].slice(0, MAX_GENRES_COUNTER)
);
