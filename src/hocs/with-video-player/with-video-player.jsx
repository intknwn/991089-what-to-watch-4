import React from 'react';
import {videoType} from '../../types/types.js';
import {formatTimeLeft, getProgress} from '../../utils/common.js';

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        video: null,
      };

      this.onEnterHandler = this._onEnterHandler.bind(this);
      this.onLeaveHandler = this._onLeaveHandler.bind(this);
      this.onPlayClickHandler = this._onPlayClickHandler.bind(this);
      this.onFullScreenClickHandler = this._onFullScreenClickHandler.bind(this);
      this.setVideo = this._setVideo.bind(this);
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
        videoElement.oncanplay = null;
      }
    }

    _setVideo(video) {
      this.setState(({video}));
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
      const {
        video,
        isPlaying,
        duration,
        currentTime
      } = this.state;

      const timeLeft = formatTimeLeft(duration - currentTime);
      const progress = getProgress(duration, currentTime);

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onFullScreenClick={this.onFullScreenClickHandler}
          onMouseEnter={this.onEnterHandler}
          onMouseLeave={this.onLeaveHandler}
          onPlayClick={this.onPlayClickHandler}
          progress={progress}
          setVideo={this.setVideo}
          timeLeft={timeLeft}
          video={video}
          videoRef={this._videoRef}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {
    playerConfig: videoType,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
