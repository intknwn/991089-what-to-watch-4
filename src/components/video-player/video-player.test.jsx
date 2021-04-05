import React from 'react';
import renderer from 'react-test-renderer';
import {VideoPlayer} from './video-player.jsx';

const video = {
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

it(`VideoPlayer component should renders correctly`, () => {
  const videoRef = React.createRef();

  const tree = renderer.create(
      <VideoPlayer
        videoRef={videoRef}
        setVideo={() => {}}
        video={video}
        movies={[]}
        timeLeft={`00:00:30`}
        progress={30}
        isPlaying={true}
        onPlayClick={() => {}}
        onFullScreenClick={() => {}}
        playerConfig={{loop: true}}
        match={{params: {id: `1`}}}
        location={{}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
