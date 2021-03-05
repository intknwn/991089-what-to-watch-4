import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movie = {
  name: `Die Hard`,
  year: 1988,
  genre: `Action`,
};

const movies = [{
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  genre: `Fantasy`,
  year: 2018,
  rating: 6.6,
  score: 240,
  description: `In an effort to thwart Grindelwald's plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.`,
  director: `David Yates`,
  cast: `Eddie Redmayne, Katherine Waterston, Dan Fogler`,
},
{
  name: `Bohemian Rhapsody`,
  previewImg: `img/bohemian-rhapsody.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  genre: `Biography`,
  year: 2018,
  rating: 8.0,
  score: 450,
  description: `The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).`,
  director: `Bryan Singer`,
  cast: `Rami Malek, Lucy Boynton, Gwilym Lee`,
},
{
  name: `We need to talk about Kevin`,
  previewImg: `img/we-need-to-talk-about-kevin.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  genre: `Thriller`,
  year: 2011,
  rating: 7.5,
  score: 138,
  description: `Kevin's mother struggles to love her strange child, despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.`,
  director: `Lynne Ramsay`,
  cast: `Tilda Swinton, John C. Reilly, Ezra Miller`,
},
{
  name: `What We Do in the Shadows`,
  previewImg: `img/what-we-do-in-the-shadows.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  genre: `Comedy`,
  year: 2019,
  rating: 8.5,
  score: 36894,
  description: `A look into the daily (or rather, nightly) lives of three vampires, who've lived together for over 100 years, on Staten Island.`,
  director: `Jemaine Clement`,
  cast: ` Kayvan Novak, Matt Berry, Natasia Demetriou`,
}];

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
