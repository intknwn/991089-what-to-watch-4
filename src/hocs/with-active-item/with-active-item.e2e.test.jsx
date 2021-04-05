import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import withActiveItem from './with-active-item.jsx';
import {Tab} from '../../const.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({activeItemChangeHandler}) => <div onClick={() => activeItemChangeHandler(Tab.REVIEWS)}/>;

MockComponent.propTypes = {
  activeItemChangeHandler: PropTypes.func.isRequired,
};

const MockComponentWrapped = withActiveItem(MockComponent);

it(`Component should have a pause state`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        activeItem={Tab.OVERVIEW}
      />);

  expect(wrapper.state(`activeItem`)).toBe(Tab.OVERVIEW);
});

it(`Component should have a playing state`, () => {
  const wrapper = mount(
      <MockComponentWrapped
        activeItem={Tab.OVERVIEW}
      />
  );

  const div = wrapper.find(`div`);
  div.simulate(`click`);

  expect(wrapper.state(`activeItem`)).toBe(Tab.REVIEWS);
});
