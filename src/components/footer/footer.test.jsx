import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Footer from '../footer/footer.jsx';

it(`Footer component should render correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Footer/>
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
