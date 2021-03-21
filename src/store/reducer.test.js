import {reducer} from './reducer.js';
import {Genre} from '../const.js';
import {ActionType, ActionCreator} from './action.js';

const movies = [{
  name: `Die Hard`,
}];

it(`Reducer without arguments should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    movies: [],
    selectedGenre: Genre.ALL_GENRES,
  });
});

it(`Reducer should change a genre`, () => {
  expect(reducer({
    movies: [],
    selectedGenre: Genre.ALL_GENRES,
  }, {
    type: ActionType.SET_MOVIES_GENRE,
    payload: `Comedy`,
  })).toEqual({
    movies: [],
    selectedGenre: `Comedy`,
  });
});

it(`Reducer should set movies`, () => {
  expect(reducer({
    movies: [],
    selectedGenre: Genre.ALL_GENRES,
  }, {
    type: ActionType.SET_MOVIES,
    payload: movies
  })).toEqual({
    movies,
    selectedGenre: Genre.ALL_GENRES,
  });
});

describe(`Action creators should work correctly`, () => {
  it(`setMoviesGenre action creator returns correct action`, () => {
    expect(ActionCreator.setMovies(movies)).toEqual({
      type: ActionType.SET_MOVIES,
      payload: movies,
    });
  });

  it(`setMoviesGenre action creator returns correct action`, () => {
    expect(ActionCreator.setMoviesGenre(Genre.ALL_GENRES)).toEqual({
      type: ActionType.SET_MOVIES_GENRE,
      payload: Genre.ALL_GENRES,
    });
  });
});


