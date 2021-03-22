import React from 'react';
import {string, func, arrayOf, bool} from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {Genre} from '../../const.js';
import {ActionCreator} from '../../store/action.js';
import {promoMovieType, movieType} from '../../types/types.js';
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {selectedMovie: null};
    this.onTitleClickHandler = this._onTitleClickHandler.bind(this);
  }

  _onTitleClickHandler(selectedMovie) {
    this.setState({selectedMovie});
  }

  render() {
    const {
      movie,
      movies,
      selectedGenre,
      selectedByGenreMovies,
      isShowMore,
      onGenreClick,
      onShowMoreClick
    } = this.props;

    const {selectedMovie} = this.state;

    return (
      <React.Fragment>
        {selectedMovie ?
          <MoviePage
            movie={selectedMovie}
            movies={movies}
            onTitleClickHandler={this.onTitleClickHandler}
          /> :
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Main
                  movie={movie}
                  movies={movies}
                  onTitleClickHandler={this.onTitleClickHandler}
                  selectedGenre={selectedGenre}
                  selectedByGenreMovies={selectedByGenreMovies}
                  isShowMore={isShowMore}
                  onGenreClick={onGenreClick}
                  onShowMoreClick={onShowMoreClick}
                />
              </Route>
              <Route exact path="/movie-page">
                <MoviePage
                  movie={movies[0]}
                  movies={movies}
                  onTitleClickHandler={() => {}}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        }
      </React.Fragment>
    );
  }
}

App.propTypes = {
  movie: promoMovieType.isRequired,
  movies: arrayOf(movieType).isRequired,
  selectedGenre: string.isRequired,
  selectedByGenreMovies: arrayOf(movieType).isRequired,
  isShowMore: bool.isRequired,
  onGenreClick: func.isRequired,
  onShowMoreClick: func.isRequired,
};

const mapStateToProps = ({selectedGenre, movies, moviesPerPage}) => {
  const selectedByGenreMovies = selectedGenre === Genre.ALL_GENRES ? movies : movies.filter((mov) => mov.genre === selectedGenre);
  const selectedByGenreMoviesSliced = selectedByGenreMovies.slice(0, moviesPerPage);
  const isShowMore = selectedByGenreMovies.length > moviesPerPage;

  return {
    movies,
    selectedGenre,
    selectedByGenreMovies: selectedByGenreMoviesSliced,
    isShowMore,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setMoviesGenre(genre));
    dispatch(ActionCreator.resetMoviesPerPage());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementMoviesPerPage());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
