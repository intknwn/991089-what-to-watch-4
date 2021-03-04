import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';

const movie = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`MovieCard component should render movie card`, () => {
  const tree = renderer.create(
      <MovieCard
        movie={movie}
        onHover={() => {}}
        onClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
