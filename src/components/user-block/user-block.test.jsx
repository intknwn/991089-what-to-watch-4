import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import UserBlock from '../user-block/user-block.jsx';

const user = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarSrc: `/img/1.png`,
};

it(`UserBlock component should render correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <UserBlock
          isAuthorized={true}
          user={user}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
