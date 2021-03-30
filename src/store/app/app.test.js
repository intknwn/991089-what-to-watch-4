import {reducer} from './app.js';
import {Genre, MOVIES_PER_PAGE} from '../../const.js';
import {ActionType, ActionCreator} from '../action.js';

const movies = [{
  name: `Die Hard`,
}];

it(`Reducer without arguments should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  });
});

it(`Reducer should change a genre`, () => {
  expect(reducer({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  }, {
    type: ActionType.SET_MOVIES_GENRE,
    payload: `Comedy`,
  })).toEqual({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: `Comedy`,
    selectedMovie: null,
    isPlaying: false,
  });
});

it(`Reducer should change movies per page counter`, () => {
  expect(reducer({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  }, {
    type: ActionType.INC_MOVIES_PER_PAGE,
  })).toEqual({
    moviesPerPage: MOVIES_PER_PAGE * 2,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  });
});

it(`Reducer should reset movies per page counter`, () => {
  expect(reducer({
    moviesPerPage: MOVIES_PER_PAGE * 2,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  }, {
    type: ActionType.RESET_MOVIES_PER_PAGE,
  })).toEqual({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  });
});

it(`Reducer should change selected movie`, () => {
  expect(reducer({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  }, {
    type: ActionType.SELECT_MOVIE,
    payload: movies[0],
  })).toEqual({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: movies[0],
    isPlaying: false,
  });
});

it(`Reducer should change playing status`, () => {
  expect(reducer({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  }, {
    type: ActionType.PLAY_MOVIE,
  })).toEqual({
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: true,
  });
});

describe(`Action creators should work correctly`, () => {
  it(`setMoviesGenre action creator returns correct action`, () => {
    expect(ActionCreator.setMoviesGenre(Genre.ALL_GENRES)).toEqual({
      type: ActionType.SET_MOVIES_GENRE,
      payload: Genre.ALL_GENRES,
    });
  });

  it(`incrementMoviesPerPage action creator returns correct action`, () => {
    expect(ActionCreator.incrementMoviesPerPage()).toEqual({
      type: ActionType.INC_MOVIES_PER_PAGE,
    });
  });

  it(`resetMoviesPerPage action creator returns correct action`, () => {
    expect(ActionCreator.resetMoviesPerPage()).toEqual({
      type: ActionType.RESET_MOVIES_PER_PAGE,
    });
  });

  it(`selectMovie action creator returns correct action`, () => {
    expect(ActionCreator.selectMovie(movies[0])).toEqual({
      type: ActionType.SELECT_MOVIE,
      payload: movies[0],
    });
  });

  it(`playMovie action creator returns correct action`, () => {
    expect(ActionCreator.playMovie()).toEqual({
      type: ActionType.PLAY_MOVIE,
    });
  });
});

