import React from 'react';
import {func, arrayOf} from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {movieType} from '../../types/types.js';

const MovieCardWrapped = withVideoPlayer(MovieCard);

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeMovie: null};
    this.movieCardHoverHandler = this._movieCardHoverHandler.bind(this);
  }

  _movieCardHoverHandler(activeMovie) {
    this.setState({activeMovie});
  }

  render() {
    const {movies, onTitleClickHandler} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movieData) => <MovieCardWrapped key={movieData.name} movie={movieData} onClick={onTitleClickHandler} onHover={this.movieCardHoverHandler} />)}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: arrayOf(movieType).isRequired,
  onTitleClickHandler: func.isRequired,
};

export default MoviesList;
