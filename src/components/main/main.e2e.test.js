import React from 'react';
import Enzyme, {shallow} from 'enzyme';
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

const movies = [`Falling down`, `Apocalypse Now`, `The Terminator`];

it(`Click on list item's title should trigger callback function`, () => {
  const onTitleClickHandler = jest.fn();

  const mainScreen = shallow(
      <Main
        movie={movie}
        movies={movies}
        onTitleClickHandler={onTitleClickHandler}
      />
  );

  const titles = mainScreen.find(`.small-movie-card__title`);
  titles.forEach((title) => title.simulate(`click`));

  expect(onTitleClickHandler.mock.calls.length).toBe(3);
});
