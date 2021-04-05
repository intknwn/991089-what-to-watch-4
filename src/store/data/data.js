import {ActionType} from '../action.js';

const initialState = {
  promoMovie: null,
  movies: [],
  reviews: [],
  favoriteMovies: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });
    case ActionType.SET_PROMO_MOVIE:
      return Object.assign({}, state, {
        promoMovie: action.payload,
      });
    case ActionType.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
      });
    case ActionType.SET_FAVORITE_MOVIES:
      return Object.assign({}, state, {
        favoriteMovies: action.payload,
      });
  }

  return state;
};
