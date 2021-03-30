import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const MockComponent = () => <video />;

it(`VideoPlayer component should renders correctly`, () => {
  const tree = renderer.create(
      <VideoPlayer
        movieName={`Die Hard`}
        timeLeft={`00:00:30`}
        progress={30}
        isPlaying={true}
        onPlayClick={() => {}}
        onFullScreenClick={() => {}}
        onExitClick={() => {}}
      >
        <MockComponent />
      </VideoPlayer>

  ).toJSON();

  expect(tree).toMatchSnapshot();
});
