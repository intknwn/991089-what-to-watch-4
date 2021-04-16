import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, bool, func, number, string} from 'prop-types';
import {locationType, matchType, movieType, refType, videoType} from '../../types/types.js';
import {getMovies} from '../../store/selectors.js';
import {AppRoute} from '../../const.js';
import history from '../../history.js';

const onExitClickHandler = () => history.goBack();
class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {match} = this.props;
    const id = +match.params.id;

    this.findMovieById(id);
  }

  componentDidUpdate(prevProps) {
    const {location, match} = this.props;
    const id = +match.params.id;

    if (prevProps.location !== location) {
      this.findMovieById(id);
    }
  }

  findMovieById(id) {
    if (Number.isInteger(id)) {
      const movie = this.props.movies.find((movieItem) => movieItem.id === id);

      if (movie) {
        this.props.setVideo(movie);

        return;
      }
    }

    history.push(AppRoute.MAIN);
  }

  render() {
    const {
      isPlaying,
      onFullScreenClick,
      onPlayClick,
      playerConfig,
      progress,
      timeLeft,
      video,
      videoRef,
    } = this.props;

    const name = video ? video.name : ``;
    const previewVid = video ? video.previewVid : ``;
    const previewImg = video ? video.previewImg : ``;

    return (
      <div className="player">
        <video
          ref={videoRef}
          className="player__video"
          src={previewVid}
          poster={previewImg}
          {...playerConfig}
          onClick={onPlayClick}
        />
        <button type="button" className="player__exit" onClick={onExitClickHandler}>Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max={100} />
              <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timeLeft}</div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={onPlayClick}>
              {
                isPlaying ?
                  <svg viewBox="0 0 14 21" width={14} height={21}>
                    <use xlinkHref="#pause" />
                  </svg> :
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
              }
              <span>{isPlaying ? `Pause` : `Play`}</span>
            </button>
            <div className="player__name">{name}</div>
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
  }
}

VideoPlayer.propTypes = {
  isPlaying: bool.isRequired,
  location: locationType.isRequired,
  match: matchType.isRequired,
  movies: arrayOf(movieType).isRequired,
  onFullScreenClick: func.isRequired,
  onPlayClick: func.isRequired,
  playerConfig: videoType.isRequired,
  progress: number.isRequired,
  setVideo: func.isRequired,
  timeLeft: string.isRequired,
  video: movieType,
  videoRef: refType.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

export {VideoPlayer};
export default connect(mapStateToProps)(VideoPlayer);
