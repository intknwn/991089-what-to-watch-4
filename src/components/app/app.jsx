import React from 'react';
import {func, arrayOf} from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {Genre} from '../../const.js';
import {promoMovieType, movieType} from '../../types/types.js';
import {ActionCreator} from '../../store/action.js';
class App extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedMovie !== nextProps.selectedMovie) {
      return true;
    }

    return false;
  }

  render() {
    const {
      movie,
      selectedMovie,
      selectedByGenreMovies,
      onMovieCardClickHandler,
    } = this.props;

    return (
      selectedMovie ?
        <MoviePage
          movie={selectedMovie}
          movies={selectedByGenreMovies}
          onMovieCardClickHandler={onMovieCardClickHandler}
        /> :
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Main
                movie={movie}
              />
            </Route>
            <Route exact path="/movie-page">
              <MoviePage
                movie={selectedByGenreMovies[0]}
                movies={selectedByGenreMovies}
                onMovieCardClickHandler={() => {}}
              />
            </Route>
          </Switch>
        </BrowserRouter>
    );
  }
}

App.propTypes = {
  movie: promoMovieType.isRequired,
  selectedMovie: movieType,
  selectedByGenreMovies: arrayOf(movieType).isRequired,
  onMovieCardClickHandler: func.isRequired,
};

const mapStateToProps = ({selectedGenre, selectedMovie, movies, moviesPerPage}) => {
  const selectedByGenreMovies = selectedGenre === Genre.ALL_GENRES ?
    movies :
    movies.filter((mov) => mov.genre === selectedGenre).slice(0, moviesPerPage);

  return {
    selectedMovie,
    selectedByGenreMovies,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClickHandler(movie) {
    dispatch(ActionCreator.selectMovie(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
