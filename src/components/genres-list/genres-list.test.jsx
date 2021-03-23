import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import {Genre} from '../../const.js';

const genres = [
  Genre.ALL_GENRES,
  `Fantasy`,
  `Biography`,
  `Thriller`,
  `Comedy`,
  `Adventure`,
  `Crime`,
  `Action`,
];

it(`GenresList component should renders correctly`, () => {
  const tree = renderer.create(
      <GenresList
        genres={genres}
        selectedGenre={Genre.ALL_GENRES}
        onGenreClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
