import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Main from './main.jsx';
import {Genre, MOVIES_PER_PAGE} from '../../const.js';
import movies from '../../mocks/movies.js';
import NameSpace from '../../store/namespace.js';

const mockStore = configureStore([]);

const promoMovie = {
  name: `Die Hard`,
  previewImg: `img/die-hard.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  previewVid: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Action`,
  year: 1988,
  rating: 8.2,
  score: 796619,
  description: `An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.`,
  director: `John McTiernan`,
  cast: [`Bruce Willis`, `Alan Rickman`, `Bonnie Bedelia`],
  runtime: 112,
};

const initialState = {
  [NameSpace.DATA]: {
    promoMovie,
    movies,
    reviews: []
  },
  [NameSpace.APP]: {
    moviesPerPage: MOVIES_PER_PAGE,
    selectedGenre: Genre.ALL_GENRES,
    selectedMovie: null,
    isPlaying: false,
  }
};

it(`Main component should render main screen`, () => {
  const store = mockStore(initialState);

  const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              promoMovie={promoMovie}
              onPlayClick={() => {}}
              isAuthorized={true}
            />
          </Provider>
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
