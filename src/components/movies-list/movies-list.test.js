import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from './movies-list.jsx';

const movies = [{
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
},
{
  name: `Bohemian Rhapsody`,
  previewImg: `img/bohemian-rhapsody.jpg`,
},
{
  name: `Macbeth`,
  previewImg: `img/macbeth.jpg`,
},
{
  name: `Aviator`,
  previewImg: `img/aviator.jpg`,
}];

it(`MoviesList component should render list of movies`, () => {
  const tree = renderer.create(
      <MoviesList
        movies={movies}
        onTitleClickHandler={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
