import React from 'react';
import {string, number} from 'prop-types';

const VideoPlayer = ({src, width, height, poster}) =>
  <video
    src={src}
    width={width}
    height={height}
    poster={poster}
    autoPlay
    muted
    loop
  />;


VideoPlayer.propTypes = {
  src: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  poster: string.isRequired,
};

export default VideoPlayer;
