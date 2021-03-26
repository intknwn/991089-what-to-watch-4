import React from 'react';
import {func, arrayOf, bool} from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {Genre, MOVIES_LIST_PLAYER_CONFIG} from '../../const.js';
import {movieType} from '../../types/types.js';
import {ActionCreator} from '../../store/action.js';

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
      selectedByGenreMovies,
      selectMovie,
      playMovie
    } = this.props;

    const Component = selectedMovie ?
      <MoviePage
        movie={selectedMovie}
        movies={selectedByGenreMovies}
        onMovieCardClickHandler={selectMovie}
        onPlayClick={playMovie}
      /> :
      <Main
        promoMovie={promoMovie}
        onPlayClick={playMovie}
        onMovieCardClickHandler={selectMovie}
      />;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isPlaying ?
              <VideoPlayerWrapped
                movie={selectedMovie || promoMovie}
                playerConfig={Object.assign({}, MOVIES_LIST_PLAYER_CONFIG, {loop: false})}
                onExitClick={playMovie}
              /> :
              Component
            }
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={selectedMovie}
              movies={selectedByGenreMovies}
              onMovieCardClickHandler={() => {}}
              onPlayClick={playMovie}
            />
          </Route>
          <Route exact path="/video-player">
            <VideoPlayerWrapped
              movie={selectedByGenreMovies[0]}
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
  selectedByGenreMovies: arrayOf(movieType).isRequired,
  selectMovie: func.isRequired,
  playMovie: func.isRequired,
};

const mapStateToProps = ({selectedGenre, selectedMovie, isPlaying, movies, promoMovie, moviesPerPage}) => {
  const selectedByGenreMovies = selectedGenre === Genre.ALL_GENRES ?
    movies :
    movies.filter((mov) => mov.genre === selectedGenre).slice(0, moviesPerPage);

  return {
    selectedMovie,
    promoMovie,
    selectedByGenreMovies,
    isPlaying
  };
};

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
