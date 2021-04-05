import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import SingIn from './sign-in.jsx';

it(`SignIn component should render correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <SingIn
          onSubmit={() => {}}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
