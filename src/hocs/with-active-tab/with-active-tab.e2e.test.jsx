import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import withActiveTab from './with-active-tab.jsx';
import {Tab} from '../../const.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({onTabClick}) => <div onClick={() => onTabClick(Tab.REVIEWS)}/>;

MockComponent.propTypes = {
  onTabClick: PropTypes.func.isRequired,
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`Component should have a pause state`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state(`activeTab`)).toBe(Tab.OVERVIEW);
});

it(`Component should have a playing state`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  const div = wrapper.find(`div`);
  div.simulate(`click`);

  expect(wrapper.state(`activeTab`)).toBe(Tab.REVIEWS);
});
