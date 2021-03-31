import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api/api.js';
import {reducer} from './user.js';
import {ActionType, ActionCreator, Operation} from '../action.js';
import {AuthStatus} from '../../const.js';

const user = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatar: `img/1.png`,
};

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

apiMock
.onGet(`/login`)
.reply(200, user);

apiMock
.onPost(`/comments/1`, {
  email: `Oliver.conner@gmail.com`,
  pass: `123`
})
.reply(200, user);


it(`Reducer without arguments should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    authStatus: AuthStatus.NOT_AUTH,
    user: null,
  });
});

it(`Reducer should set authorization status`, () => {
  expect(reducer({
    authStatus: AuthStatus.NOT_AUTH,
    user: null,
  }, {
    type: ActionType.SET_AUTH_STATUS,
    payload: AuthStatus.AUTH,
  })).toEqual({
    authStatus: AuthStatus.AUTH,
    user: null,
  });
});

it(`Reducer should set user`, () => {
  expect(reducer({
    authStatus: AuthStatus.NOT_AUTH,
    user: null,
  }, {
    type: ActionType.SET_USER,
    payload: user,
  })).toEqual({
    authStatus: AuthStatus.NOT_AUTH,
    user,
  });
});

describe(`Action creators should work correctly`, () => {
  it(`setAuthStatus action creator returns correct action`, () => {
    expect(ActionCreator.setAuthStatus(AuthStatus.AUTH)).toEqual({
      type: ActionType.SET_AUTH_STATUS,
      payload: AuthStatus.AUTH,
    });
  });

  it(`setUser action creator returns correct action`, () => {
    expect(ActionCreator.setUser(user)).toEqual({
      type: ActionType.SET_USER,
      payload: user,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Should make a correct GET request to /login`, () => {
    const dispatch = jest.fn();
    const authStatusGetter = Operation.getAuthStatus();

    authStatusGetter(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTH_STATUS,
          payload: AuthStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: user,
        });
      });
  });

  it(`Should make a correct POST request to /login`, () => {
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.getPromoMovie();

    promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: user,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_AUTH_STATUS,
          payload: AuthStatus.AUTH,
        });
      });
  });
});
