import {reducer} from './app.js';
import {ActionType, ActionCreator} from '../action.js';

it(`Reducer without arguments should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    isLoading: false,
  });
});

it(`Reducer should change loading status`, () => {
  expect(reducer({
    isLoading: false,
  }, {
    type: ActionType.SET_LOADING_STATUS,
    payload: true,
  })).toEqual({
    isLoading: true,
  });
});

describe(`Action creators should work correctly`, () => {
  it(`setLoadingStatus action creator returns correct action`, () => {
    expect(ActionCreator.setLoadingStatus(true)).toEqual({
      type: ActionType.SET_LOADING_STATUS,
      payload: true,
    });
  });
});

