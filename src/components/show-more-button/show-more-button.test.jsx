import React from 'react';
import renderer from 'react-test-renderer';
import ShowMoreButton from './show-more-button.jsx';

it(`ShowMoreButton component should renders correctly`, () => {
  const tree = renderer.create(
      <ShowMoreButton
        onClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
