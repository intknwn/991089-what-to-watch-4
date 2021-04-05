import React from 'react';
import renderer from 'react-test-renderer';
import MovieReviews from './movie-reviews.jsx';

const reviews = [{
  id: 1,
  user: {
    id: 1,
    name: `Kate Doughlas`,
  },
  rating: 8.9,
  comment: `Awesome movie!`,
  date: `2019-05-08`,
},
{
  id: 2,
  user: {
    id: 2,
    name: `Bill Westmoore`,
  },
  rating: 8.0,
  comment: `Fantastic! Best movie ever!`,
  date: `2015-11-18`,
},
{
  id: 3,
  user: {
    id: 3,
    name: `Amanda Rockefeller`,
  },
  rating: 3.0,
  comment: `Bummer! The worst movie ever!`,
  date: `2015-11-18`,
}];

it(`MoviePage component should render page with movie details`, () => {
  const tree = renderer.create(
      <MovieReviews
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
