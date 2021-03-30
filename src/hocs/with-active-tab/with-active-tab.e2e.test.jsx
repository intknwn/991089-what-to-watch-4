import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import withActiveTab from './with-active-tab.jsx';
import {Tab} from '../../const.js';

Enzyme.configure({adapter: new Adapter()});

const movie = {
  name: `Die Hard`,
  previewImg: `img/die-hard.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  previewVid: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Action`,
  year: 1988,
  rating: 8.2,
  score: 796619,
  description: `An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.`,
  director: `John McTiernan`,
  cast: [`Bruce Willis`, `Alan Rickman`, `Bonnie Bedelia`],
  runtime: 132,
};

const MockComponent = ({onTabClick}) => <div onClick={() => onTabClick(Tab.REVIEWS)}/>;

MockComponent.propTypes = {
  onTabClick: PropTypes.func.isRequired,
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`Component should have a pause state`, () => {
  const wrapper = shallow(<MockComponentWrapped movie={movie}/>);

  expect(wrapper.state(`activeTab`)).toBe(Tab.OVERVIEW);
});

it(`Component should have a playing state`, () => {
  const wrapper = mount(<MockComponentWrapped movie={movie}/>);

  const div = wrapper.find(`div`);
  div.simulate(`click`);

  expect(wrapper.state(`activeTab`)).toBe(Tab.REVIEWS);
});
