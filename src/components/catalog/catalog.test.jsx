import React from 'react';
import renderer from 'react-test-renderer';
import {Catalog} from './catalog.jsx';
import {Genre} from '../../const.js';
import genres from '../../mocks/genres.js';
import movies from '../../mocks/movies.js';

it(`Catalog component should render movies catalog`, () => {
  const tree = renderer
      .create(
          <Catalog
            genres={genres}
            selectedGenre={Genre.ALL_GENRES}
            onGenreClick={() => {}}
            selectedByGenreMovies={movies}
            isShowMore={true}
            onMovieCardClickHandler={() => {}}
            onShowMoreClick={() => {}}
          />
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
