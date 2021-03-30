import React from 'react';
import {func} from 'prop-types';
import {videoType, movieType} from '../../types/types.js';
import {formatTimeLeft, getProgress} from '../../utils/common.js';

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      };

      this.onEnterHandler = this._onEnterHandler.bind(this);
      this.onLeaveHandler = this._onLeaveHandler.bind(this);
      this.onPlayClickHandler = this._onPlayClickHandler.bind(this);
      this.onFullScreenClickHandler = this._onFullScreenClickHandler.bind(this);
    }

    componentDidMount() {
      const videoElement = this._videoRef.current;

      if (videoElement) {
        videoElement.oncanplay = () => this.setState({
          isPlaying: true,
          duration: Math.floor(videoElement.duration),
        });

        videoElement.ontimeupdate = (evt) => this.setState({
          currentTime: Math.floor(evt.target.currentTime),
        });
      }
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const videoElement = this._videoRef.current;

      if (videoElement) {
        if (isPlaying) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }
    }

    componentWillUnmount() {
      const videoElement = this._videoRef.current;

      if (videoElement) {
        videoElement.oncanplaythrough = null;
      }
    }

    _onEnterHandler() {
      this.timer = setTimeout(() => {
        this.setState({isPlaying: true});
      }, 1000);
    }

    _onLeaveHandler() {
      clearTimeout(this.timer);
      this.setState({isPlaying: false});
    }

    _onPlayClickHandler() {
      this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
    }

    _onFullScreenClickHandler() {
      this._videoRef.current.requestFullscreen();
    }

    render() {
      const {isPlaying, duration, currentTime} = this.state;
      const {name, previewVid, previewImg} = this.props.movie;
      const timeLeft = formatTimeLeft(duration - currentTime);
      const progress = getProgress(duration, currentTime);

      return (
        <Component
          {...this.props}
          movieName={name}
          timeLeft={timeLeft}
          progress={progress}
          isPlaying={isPlaying}
          onMouseEnter={this.onEnterHandler}
          onMouseLeave={this.onLeaveHandler}
          onPlayClick={this.onPlayClickHandler}
          onFullScreenClick={this.onFullScreenClickHandler}
          onExitClick={this.props.onExitClick}
        >
          <video
            ref={this._videoRef}
            className="player__video"
            src={previewVid}
            poster={previewImg}
            {...this.props.playerConfig}
            onClick={this.onPlayClickHandler}
          />
        </Component>)
      ;
    }
  }

  WithVideoPlayer.propTypes = {
    movie: movieType,
    playerConfig: videoType,
    onExitClick: func,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
