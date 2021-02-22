import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movie = {
  name: `Die Hard`,
  year: 1988,
  genre: `Action`,
};

const movies = [`Falling down`, `Apocalypse Now`, `The Terminator`];

it(`Main component should render main screen`, () => {
  const tree = renderer
      .create(
          <Main
            movie={movie}
            movies={movies}
            onTitleClickHandler={() => {}}
          />
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
