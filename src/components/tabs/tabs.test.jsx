import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import Tabs from './tabs.jsx';
import {Tab} from '../../const.js';
import NameSpace from '../../store/namespace.js';
import reviews from '../../mocks/reviews.js';
import {createAPI} from '../../api/api.js';

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

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

apiMock.onGet(`/comments/${movie.id}`).reply(200, reviews);

const mockStore = configureStore([thunk.withExtraArgument(api)]);


const initialState = {
  [NameSpace.DATA]: {
    reviews,
  },
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
  const store = mockStore(initialState);


  const tree = renderer.create(
      <Provider store={store}>
        <Tabs
          activeTab={Tab.REVIEWS}
          onTabClick={() => {}}
          movie={movie}
        />
      </Provider>

  ).toJSON();

  expect(tree).toMatchSnapshot();
});

