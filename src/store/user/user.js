import {ActionType} from '../action.js';
import {AuthStatus} from '../../const.js';

const initialState = {
  authStatus: AuthStatus.NOT_AUTH,
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return Object.assign({}, state, {
        authStatus: action.payload
      });
    case ActionType.SET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
  }

  return state;
};
