import React from 'react';
import renderer from 'react-test-renderer';
import withSignInForm from './with-signin-from.jsx';

const MockComponent = () => <div />;

const MockComponentWrapped = withSignInForm(MockComponent);

it(`WithSignInForm component should render correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isAuthorized={true}
      onSubmit={() => {}}
      user={{}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
