import {parseMovieData} from '../adapters/adapters.js';
import {AuthStatus} from '../const.js';

export const ActionType = {
  SET_MOVIES_GENRE: `SET_MOVIES_GENRE`,
  SET_MOVIES: `SET_MOVIES`,
  SET_PROMO_MOVIE: `SET_PROMO_MOVIE`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_USER: `SET_USER`,
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
  setAuthStatus: (status) => ({
    type: ActionType.SET_AUTH_STATUS,
    payload: status,
  }),
  setUser: (user) => ({
    type: ActionType.SET_USER,
    payload: user,
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
      .then(({data}) => dispatch(ActionCreator.setMovies((data.map(parseMovieData)))));
  },
  getPromoMovie: () => (dispatch, _, api) => {
    return api.get(`/films/promo`)
      .then(({data}) => dispatch(ActionCreator.setPromoMovie(parseMovieData(data))));
  },
  getReviews: (id) => (dispatch, _, api) => {
    return api.get(`/comments/${id}`)
      .then(({data}) => dispatch(ActionCreator.setReviews(data)));
  },
  getAuthStatus: () => (dispatch, _, api) => {
    return api.get(`/login`)
      .then(({data}) => {
        dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.setUser(data));
      });
  },
  signIn: ({email, password}) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email,
      password,
    })
      .then(({data}) => {
        dispatch(ActionCreator.setUser(data));
        dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
      });
  },
};
