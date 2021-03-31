import React from 'react';
import renderer from 'react-test-renderer';
import SingIn from './sign-in.jsx';

it(`SignIn component should render correctly`, () => {
  const tree = renderer.create(
      <SingIn
        onSubmit={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
