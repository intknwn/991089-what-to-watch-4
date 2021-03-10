import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import withVideoPlayer from './with-video-player.jsx';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`Component should have a pause state`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state(`isPlaying`)).toBe(false);
});

it(`Component should have a playing state`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  const div = wrapper.find(`div`);
  div.simulate(`mouseEnter`);

  setTimeout(() => {
    expect(wrapper.state(`isPlaying`)).toBe(true);
  }, 1000);
});

