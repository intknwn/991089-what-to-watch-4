import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api/api.js';
import {reducer} from './data.js';
import {ActionType, ActionCreator, Operation} from '../action.js';
import {parseMovieData} from '../../adapters/adapters.js';

const movies = [{
  "id": 1,
  "name": `Die Hard`,
  "posterImg": `https://via.placeholder.com/273x410`,
  "preview_image": `https://via.placeholder.com/273x410`,
  "background_image": `https://via.placeholder.com/1300x552`,
  "background_color": `#FFFFFF`,
  "video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  "description": `An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.`,
  "rating": 8.2,
  "scores_count": 796619,
  "director": `John McTiernan`,
  "cast": [`Bruce Willis`, `Alan Rickman`, `Bonnie Bedelia`],
  "run_time": 132,
  "genre": `Action`,
  "released": 1988,
  "is_favorite": true,
}];

const parsedMoviesData = movies.map(parseMovieData);

const reviews = [{
  id: 1,
  user: {
    id: 1,
    name: `Kate Muir`,
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`,
}];

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

it(`Reducer without arguments should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    promoMovie: null,
    movies: [],
    reviews: [],
  });
});

it(`Reducer should set movies`, () => {
  expect(reducer({
    promoMovie: null,
    movies: [],
    reviews: [],
  }, {
    type: ActionType.SET_MOVIES,
    payload: movies
  })).toEqual({
    promoMovie: null,
    movies,
    reviews: [],
  });
});

it(`Reducer should change promo movie`, () => {
  expect(reducer({
    promoMovie: null,
    movies: [],
    reviews: [],
  }, {
    type: ActionType.SET_PROMO_MOVIE,
    payload: movies[0],
  })).toEqual({
    promoMovie: movies[0],
    movies: [],
    reviews: [],
  });
});

it(`Reducer should change set reviews`, () => {
  expect(reducer({
    promoMovie: null,
    movies: [],
    reviews: [],
  }, {
    type: ActionType.SET_REVIEWS,
    payload: reviews,
  })).toEqual({
    promoMovie: null,
    movies: [],
    reviews,
  });
});

describe(`Action creators should work correctly`, () => {
  it(`setMovies action creator returns correct action`, () => {
    expect(ActionCreator.setMovies(movies)).toEqual({
      type: ActionType.SET_MOVIES,
      payload: movies,
    });
  });

  it(`setPromoMovie action creator returns correct action`, () => {
    expect(ActionCreator.setPromoMovie(movies[0])).toEqual({
      type: ActionType.SET_PROMO_MOVIE,
      payload: movies[0],
    });
  });

  it(`setReviews action creator returns correct action`, () => {
    expect(ActionCreator.setReviews(reviews)).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: reviews,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Should make a correct API request to /films`, () => {
    const dispatch = jest.fn();
    const moviesLoader = Operation.getMovies();

    apiMock
    .onGet(`/films`)
    .reply(200, movies);

    moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_MOVIES,
          payload: parsedMoviesData,
        });
      });
  });

  it(`Should make a correct API request to /films/promo`, () => {
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.getPromoMovie();

    apiMock
    .onGet(`/films/promo`)
    .reply(200, movies[0]);

    promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_PROMO_MOVIE,
          payload: parsedMoviesData[0],
        });
      });
  });

  it(`Should make a correct API request to /comments/1`, () => {
    const dispatch = jest.fn();
    const reviewsLoader = Operation.getReviews(1);

    apiMock
    .onGet(`/comments/1`)
    .reply(200, reviews);

    reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEWS,
          payload: reviews,
        });
      });
  });

  it(`Should make a correct POST request to comments/id`, function () {
    const id = 1;
    const postReviewLoader = Operation.postReview(id, {}, () => {});
    const dispatch = jest.fn();

    apiMock
    .onPost(`/comments/${id}`)
    .reply(200, reviews);

    return postReviewLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_LOADING_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_REVIEWS,
          payload: reviews,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_LOADING_STATUS,
          payload: false,
        });
      });
  });
});
