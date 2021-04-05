import {parseMovieData} from '../adapters/adapters.js';
import {AuthStatus} from '../const.js';

export const ActionType = {
  SET_MOVIES: `SET_MOVIES`,
  SET_FAVORITE_MOVIES: `SET_FAVORITE_MOVIES`,
  SET_PROMO_MOVIE: `SET_PROMO_MOVIE`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
  SET_USER: `SET_USER`,
};

export const ActionCreator = {
  setMovies: (movies) => ({
    type: ActionType.SET_MOVIES,
    payload: movies,
  }),
  setFavoriteMovies: (movies) => ({
    type: ActionType.SET_FAVORITE_MOVIES,
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
  setLoadingStatus: (isLoading) => ({
    type: ActionType.SET_LOADING_STATUS,
    payload: isLoading,
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
  postReview: (id, review, onSuccess) => (dispatch, _, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));

    return api.post(`/comments/${id}`, review)
      .then(({data}) => {
        onSuccess();
        dispatch(ActionCreator.setReviews(data));
      })
      .then(() => {
        dispatch(ActionCreator.setLoadingStatus(false));
      })
      .catch(() => {
        dispatch(ActionCreator.setLoadingStatus(false));
      });
  },
  setFavoriteStatus: (id, isFavorite) => (dispatch, _, api) => {
    const status = isFavorite ? 0 : 1;

    return api.post(`/favorite/${id}/${status}`)
      .then(() => {
        dispatch(Operation.getMovies());
        dispatch(Operation.getPromoMovie());
        dispatch(Operation.getFavoriteMovies());
      });
  },
  getFavoriteMovies: () => (dispatch, _, api) => {
    return api.get(`/favorite`)
      .then(({data}) => {
        dispatch(ActionCreator.setFavoriteMovies(data.map(parseMovieData)));
      });
  },
};
