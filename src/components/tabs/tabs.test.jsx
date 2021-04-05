import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';
import {Tab} from '../../const.js';

const movie = {
  id: 1,
  name: `Die Hard`,
  previewImg: `img/die-hard.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  previewVid: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Action`,
  year: 1988,
  rating: 8.2,
  score: 796619,
  description: `An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.`,
  director: `John McTiernan`,
  cast: [`Bruce Willis`, `Alan Rickman`, `Bonnie Bedelia`],
  runtime: 132,
};

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

it(`Tabs component should render overview tab correctly`, () => {
  const tree = renderer.create(
      <Tabs
        activeItem={Tab.OVERVIEW}
        activeItemChangeHandler={() => {}}
        movie={movie}
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Tabs component should render details tab correctly`, () => {
  const tree = renderer.create(
      <Tabs
        activeItem={Tab.DETAILS}
        activeItemChangeHandler={() => {}}
        movie={movie}
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Tabs component should render reviews tab correctly`, () => {
  const tree = renderer.create(
      <Tabs
        activeItem={Tab.REVIEWS}
        activeItemChangeHandler={() => {}}
        movie={movie}
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

