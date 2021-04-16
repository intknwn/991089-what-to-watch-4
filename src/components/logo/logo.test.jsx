import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Logo from '../logo/logo.jsx';
import {ClassName} from '../../const.js';

it(`Logo component should render correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Logo
          className={ClassName.LOGO_LINK}
          isEmpty={false}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
