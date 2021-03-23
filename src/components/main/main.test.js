import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Main from './main.jsx';
import {Genre, MOVIES_PER_PAGE} from '../../const.js';
import movies from '../../mocks/movies.js';

const mockStore = configureStore([]);

const initialState = {
  movies,
  moviesPerPage: MOVIES_PER_PAGE,
  selectedGenre: Genre.ALL_GENRES,
  selectedMovie: null,
};

const movie = {
  name: `Die Hard`,
  year: 1988,
  genre: `Action`,
};

it(`Main component should render main screen`, () => {
  const store = mockStore(initialState);

  const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              movie={movie}
            />
          </Provider>
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
