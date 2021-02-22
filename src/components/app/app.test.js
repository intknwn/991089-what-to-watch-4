import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const movie = {
  name: `Die Hard`,
  year: 1988,
  genre: `Action`,
};

const movies = [`Falling down`, `Apocalypse Now`, `The Terminator`];

it(`App component should render application`, () => {
  const tree = renderer
    .create(
        <App
          movie={movie}
          movies={movies}
          onTitleClickHandler={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
