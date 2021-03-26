import {ActionType} from './action.js';
import {Genre, MOVIES_PER_PAGE} from '../const.js';

const initialState = {
  promoMovie: null,
  movies: [],
  moviesPerPage: MOVIES_PER_PAGE,
  selectedGenre: Genre.ALL_GENRES,
  selectedMovie: null,
  isPlaying: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MOVIES_GENRE:
      return Object.assign({}, state, {
        selectedGenre: action.payload,
      });
    case ActionType.SET_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });
    case ActionType.SET_PROMO_MOVIE:
      return Object.assign({}, state, {
        promoMovie: action.payload,
      });
    case ActionType.INC_MOVIES_PER_PAGE:
      return Object.assign({}, state, {
        moviesPerPage: state.moviesPerPage * 2,
      });
    case ActionType.RESET_MOVIES_PER_PAGE:
      return Object.assign({}, state, {
        moviesPerPage: MOVIES_PER_PAGE,
      });
    case ActionType.SELECT_MOVIE:
      return Object.assign({}, state, {
        selectedMovie: action.payload,
      });
    case ActionType.PLAY_MOVIE:
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying,
      });
  }

  return state;
};
