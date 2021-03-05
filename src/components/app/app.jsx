/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
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
    const {movie, movies} = this.props;
    const {selectedMovie} = this.state;

    return (
      <React.Fragment>
        {selectedMovie ?
          <MoviePage movie={selectedMovie} /> :
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Main
                  movie={movie}
                  movies={movies}
                  onTitleClickHandler={this.onTitleClickHandler}
                />
              </Route>
              <Route exact path="/movie-page">
                <MoviePage movie={movies[0]}/>
              </Route>
            </Switch>
          </BrowserRouter>
        }
      </React.Fragment>
    );
  }
}

App.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    posterImg: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    cast: PropTypes.string.isRequired,
  })).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
};

export default App;
