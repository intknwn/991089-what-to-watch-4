import {ActionType} from './action.js';
import {Genre, MOVIES_PER_PAGE} from '../const.js';

const initialState = {
  movies: [],
  moviesPerPage: MOVIES_PER_PAGE,
  selectedGenre: Genre.ALL_GENRES,
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
    case ActionType.INC_MOVIES_PER_PAGE:
      return Object.assign({}, state, {
        moviesPerPage: state.moviesPerPage * 2,
      });
    case ActionType.RESET_MOVIES_PER_PAGE:
      return Object.assign({}, state, {
        moviesPerPage: MOVIES_PER_PAGE,
      });
  }

  return state;
};
