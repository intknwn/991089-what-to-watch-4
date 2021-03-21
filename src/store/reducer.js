import {ActionType} from './action.js';
import {Genre} from '../const.js';

const initialState = {
  movies: [],
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
  }

  return state;
};
