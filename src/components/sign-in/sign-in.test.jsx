import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import SingIn from './sign-in.jsx';

it(`SignIn component should render correctly`, () => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const tree = renderer.create(
      <BrowserRouter>
        <SingIn
          emailRef={emailRef}
          error={null}
          isAuthorized={false}
          onChange={() => {}}
          onSubmit={() => {}}
          passwordRef={passwordRef}
          user={{}}
        />
      </BrowserRouter>,
      {
        createNodeMock: () => ({})
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
