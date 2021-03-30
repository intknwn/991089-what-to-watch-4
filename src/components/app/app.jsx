import React from 'react';
import {func, arrayOf, bool} from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {MOVIES_LIST_PLAYER_CONFIG, MOVIE_PAGE_PLAYER_CONFIG} from '../../const.js';
import {movieType} from '../../types/types.js';
import {ActionCreator} from '../../store/action.js';
import {getSimilarMovies, getPromoMovie} from '../../store/data/data-selectors.js';
import {getSelectedMovie, getPlaybackStatus} from '../../store/app/app-selectors.js';

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);
class App extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedMovie !== nextProps.selectedMovie) {
      return true;
    }

    if (this.props.isPlaying !== nextProps.isPlaying) {
      return true;
    }

    return false;
  }

  render() {
    const {
      selectedMovie,
      promoMovie,
      isPlaying,
      similarMovies,
      selectMovie,
      playMovie
    } = this.props;

    const onMovieCardClickHandler = (movie) => {
      selectMovie(movie);
      window.scrollTo(0, 0);
    };

    const Component = selectedMovie ?
      <MoviePage
        movie={selectedMovie}
        similarMovies={similarMovies}
        onMovieCardClickHandler={onMovieCardClickHandler}
        onPlayClick={playMovie}
      /> :
      <Main
        promoMovie={promoMovie}
        onPlayClick={playMovie}
        onMovieCardClickHandler={onMovieCardClickHandler}
      />;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isPlaying ?
              <VideoPlayerWrapped
                movie={selectedMovie || promoMovie}
                playerConfig={MOVIE_PAGE_PLAYER_CONFIG}
                onExitClick={playMovie}
              /> :
              Component
            }
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={selectedMovie}
              similarMovies={similarMovies}
              onMovieCardClickHandler={() => {}}
              onPlayClick={playMovie}
            />
          </Route>
          <Route exact path="/video-player">
            <VideoPlayerWrapped
              movie={similarMovies[0]}
              playerConfig={MOVIES_LIST_PLAYER_CONFIG}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  selectedMovie: movieType,
  promoMovie: movieType,
  isPlaying: bool.isRequired,
  similarMovies: arrayOf(movieType).isRequired,
  selectMovie: func.isRequired,
  playMovie: func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMovie: getSelectedMovie(state),
  promoMovie: getPromoMovie(state),
  similarMovies: getSimilarMovies(state),
  isPlaying: getPlaybackStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectMovie(movie) {
    dispatch(ActionCreator.selectMovie(movie));
  },
  playMovie() {
    dispatch(ActionCreator.playMovie());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
