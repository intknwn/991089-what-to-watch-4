import React from 'react';
import {string, func, arrayOf} from 'prop-types';
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
    const {movie, movies, selectedGenre, selectedByGenreMovies, onGenreClick} = this.props;
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
                  onGenreClick={onGenreClick}
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
  onGenreClick: func.isRequired,
  selectedByGenreMovies: arrayOf(movieType).isRequired,
};

const mapStateToProps = ({selectedGenre, movies}) => ({
  movies,
  selectedGenre,
  selectedByGenreMovies: selectedGenre === Genre.ALL_GENRES ? movies : movies.filter((mov) => mov.genre === selectedGenre),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setMoviesGenre(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
