import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withShowMore from './with-show-more.jsx';

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

const MockComponentWrapped = withShowMore(MockComponent);

it(`withShowMore component should render correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped>
      <React.Fragment />
    </MockComponentWrapped>
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
