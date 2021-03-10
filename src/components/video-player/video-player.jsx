import React from 'react';
import PropTypes from 'prop-types';

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
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  isAutoPlay: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
};

export default VideoPlayer;
