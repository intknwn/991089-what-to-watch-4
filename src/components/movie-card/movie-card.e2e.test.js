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
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  previewVid: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Fantasy`,
  year: 2018,
  rating: 6.6,
  score: 240,
  description: `In an effort to thwart Grindelwald's plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.`,
  director: `David Yates`,
  cast: [`Eddie Redmayne`, `Katherine Waterston`, `Dan Fogler`],
};

it(`Hover on movie card should trigger callback with active movie as an argument`, () => {
  const movieCardHoverHandler = jest.fn();

  const movieCard = shallow(
      <MovieCard
        videoRef={{}}
        movie={movie}
        onClick={() => {}}
        isPlaying={false}
        onMouseEnter={movieCardHoverHandler}
        onMouseLeave={() => {}}
        playerConfig={{
          loop: true,
        }}
      />
  );

  const card = movieCard.find(`.small-movie-card`);
  card.simulate(`mouseEnter`);

  expect(movieCardHoverHandler).toBeCalledWith(movie);
});

