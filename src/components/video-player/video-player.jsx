import React from 'react';
import {node, func, bool, string, number} from 'prop-types';

const playSvg = (
  <svg viewBox="0 0 19 19" width={19} height={19}>
    <use xlinkHref="#play-s" />
  </svg>
);

const pauseSvg = (
  <svg viewBox="0 0 14 21" width={14} height={21}>
    <use xlinkHref="#pause" />
  </svg>
);

const VideoPlayer = ({
  movieName,
  timeLeft,
  progress,
  isPlaying,
  onClick,
  onFullScreenClick,
  onExitClick,
  children
}) => {
  return (
    <div className="player">
      {children}
      <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={100} />
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onClick}>
            {isPlaying ? pauseSvg : playSvg}
            <span>{isPlaying ? `Pause` : `Play`}</span>
          </button>
          <div className="player__name">{movieName}</div>
          <button type="button" className="player__full-screen" onClick={onFullScreenClick}>
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  movieName: string.isRequired,
  timeLeft: string.isRequired,
  progress: number.isRequired,
  isPlaying: bool.isRequired,
  onClick: func.isRequired,
  onFullScreenClick: func.isRequired,
  onExitClick: func.isRequired,
  children: node.isRequired,
};

export default VideoPlayer;
