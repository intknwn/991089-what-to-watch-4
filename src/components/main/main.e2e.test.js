import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

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

it(`Click on list item's title should trigger callback function`, () => {
  const onTitleClickHandler = jest.fn();

  const mainScreen = mount(
      <Main
        movie={movie}
        movies={movies}
        onTitleClickHandler={onTitleClickHandler}
      />
  );

  const titles = mainScreen.find(`.small-movie-card__title`);
  titles.forEach((title) => title.simulate(`click`));

  expect(onTitleClickHandler.mock.calls.length).toBe(4);
});
