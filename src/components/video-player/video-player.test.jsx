import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

it(`VideoPlayer component should renders correctly`, () => {
  const tree = renderer.create(
      <VideoPlayer
        src={`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
        width={280}
        height={175}
        poster={`https://via.placeholder.com/273x410`}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
