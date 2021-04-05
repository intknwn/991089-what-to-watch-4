import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withActiveItem from './with-active-item.jsx';

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

const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem component should render correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped>
      <React.Fragment />
    </MockComponentWrapped>
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
