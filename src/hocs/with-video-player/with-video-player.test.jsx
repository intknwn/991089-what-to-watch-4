import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withVideoPlayer from './with-video-player.jsx';
import movies from '../../mocks/movies.js';

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`withVideoPlayer component should render correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      movie={movies[0]}
      playerConfig={{}}
      onExitClick={() => {}}
    >
      <React.Fragment />
    </MockComponentWrapped>
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
