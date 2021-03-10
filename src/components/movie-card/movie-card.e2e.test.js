import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MovieCard from './movie-card.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const movie = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVid: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Hover on movie card should trigger callback with active movie as an argument`, () => {
  const movieCardHoverHandler = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onClick={() => {}}
        isPlaying={false}
        onMouseEnter={movieCardHoverHandler}
        onMouseLeave={() => {}}
      />
  );

  const card = movieCard.find(`.small-movie-card`);
  card.simulate(`mouseEnter`);

  expect(movieCardHoverHandler).toBeCalledWith(movie);
});

it(`Click on movie card should trigger callback with active movie as an argument`, () => {
  const movieCardClickHandler = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onClick={movieCardClickHandler}
        isPlaying={false}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />
  );

  const card = movieCard.find(`.small-movie-card`);
  card.simulate(`click`, {
    preventDefault: () => {}
  });

  expect(movieCardClickHandler).toBeCalledWith(movie);
});
