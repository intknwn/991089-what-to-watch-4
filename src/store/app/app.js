import {ActionType} from '../action.js';

const initialState = {
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LOADING_STATUS:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
  }

  return state;
};
