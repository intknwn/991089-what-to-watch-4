import React from 'react';

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.onEnterHandler = this._onEnterHandler.bind(this);
      this.onLeaveHandler = this._onLeaveHandler.bind(this);
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

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        onMouseEnter={this.onEnterHandler}
        onMouseLeave={this.onLeaveHandler}
      />;
    }
  }

  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
};

export default withAudioPlayer;
