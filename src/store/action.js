import {parseMovieData} from '../adapters/adapters.js';

export const ActionType = {
  SET_MOVIES_GENRE: `SET_MOVIES_GENRE`,
  SET_MOVIES: `SET_MOVIES`,
  SET_PROMO_MOVIE: `SET_PROMO_MOVIE`,
  SET_REVIEWS: `SET_REVIEWS`,
  INC_MOVIES_PER_PAGE: `INC_MOVIES_PER_PAGE`,
  RESET_MOVIES_PER_PAGE: `RESET_MOVIES_PER_PAGE`,
  SELECT_MOVIE: `SELECT_MOVIE`,
  PLAY_MOVIE: `PLAY_MOVIE`,
};

export const ActionCreator = {
  setMoviesGenre: (genre) => ({
    type: ActionType.SET_MOVIES_GENRE,
    payload: genre,
  }),
  setMovies: (movies) => ({
    type: ActionType.SET_MOVIES,
    payload: movies,
  }),
  setPromoMovie: (movie) => ({
    type: ActionType.SET_PROMO_MOVIE,
    payload: movie,
  }),
  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews,
  }),
  incrementMoviesPerPage: () => ({
    type: ActionType.INC_MOVIES_PER_PAGE,
  }),
  resetMoviesPerPage: () => ({
    type: ActionType.RESET_MOVIES_PER_PAGE,
  }),
  selectMovie: (movie) => ({
    type: ActionType.SELECT_MOVIE,
    payload: movie,
  }),
  playMovie: () => ({
    type: ActionType.PLAY_MOVIE,
  }),
};

export const Operation = {
  getMovies: () => (dispatch, _, api) => {
    return api.get(`/films`)
      .then((response) => dispatch(ActionCreator.setMovies((response.data.map(parseMovieData)))));
  },
  getPromoMovie: () => (dispatch, _, api) => {
    return api.get(`/films/promo`)
      .then((response) => dispatch(ActionCreator.setPromoMovie(parseMovieData(response.data))));
  },
  getReviews: (id) => (dispatch, _, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => dispatch(ActionCreator.setReviews(response.data)));
  },
};
