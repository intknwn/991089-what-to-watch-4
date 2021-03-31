import React from 'react';
import {func, arrayOf, bool} from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {MOVIE_PAGE_PLAYER_CONFIG, AuthStatus} from '../../const.js';
import {movieType} from '../../types/types.js';
import {ActionCreator, Operation} from '../../store/action.js';
import {getSimilarMovies, getPromoMovie} from '../../store/data/data-selectors.js';
import {getSelectedMovie, getPlaybackStatus} from '../../store/app/app-selectors.js';
import {getAuthStatus} from '../../store/user/user-selectors.js';

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);
class App extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedMovie !== nextProps.selectedMovie) {
      return true;
    }

    if (this.props.isPlaying !== nextProps.isPlaying) {
      return true;
    }

    if (this.props.isAuthorized !== nextProps.isAuthorized) {
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
      playMovie,
      isAuthorized,
      onSubmit
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
        isAuthorized={isAuthorized}
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
          <Route exact path="/sign-in">
            {isAuthorized ?
              Component :
              <SignIn onSubmit={onSubmit}/>
            }
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
  isAuthorized: bool.isRequired,
  onSubmit: func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMovie: getSelectedMovie(state),
  promoMovie: getPromoMovie(state),
  similarMovies: getSimilarMovies(state),
  isPlaying: getPlaybackStatus(state),
  isAuthorized: getAuthStatus(state) === AuthStatus.AUTH ? true : false,
});

const mapDispatchToProps = (dispatch) => ({
  selectMovie(movie) {
    dispatch(ActionCreator.selectMovie(movie));
  },
  playMovie() {
    dispatch(ActionCreator.playMovie());
  },
  onSubmit(userData) {
    dispatch(Operation.signIn(userData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
