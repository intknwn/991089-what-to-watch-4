import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const movie = {
  name: `Die Hard`,
  year: 1988,
  genre: `Action`,
};

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
