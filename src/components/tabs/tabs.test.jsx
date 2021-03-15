import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';
import {Tab} from '../../const.js';

const movie = {
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

it(`Tabs component should render overview tab correctly`, () => {
  const tree = renderer.create(
      <Tabs
        activeTab={Tab.OVERVIEW}
        onTabClick={() => {}}
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Tabs component should render details tab correctly`, () => {
  const tree = renderer.create(
      <Tabs
        activeTab={Tab.DETAILS}
        onTabClick={() => {}}
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Tabs component should render reviews tab correctly`, () => {
  const tree = renderer.create(
      <Tabs
        activeTab={Tab.REVIEWS}
        onTabClick={() => {}}
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

