import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Header from '../header/header.jsx';
import {ClassName} from '../../const.js';

const user = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarSrc: `/img/1.png`,
};

it(`Header component should render correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Header
          className={ClassName.MOVIE_PAGE_HEADER}
          isAuthorized={true}
          isEmpty={false}
          user={user}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
