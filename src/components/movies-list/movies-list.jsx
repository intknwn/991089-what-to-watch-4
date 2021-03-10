import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withAudioPlayer from '../../hocs/with-video-player/with-video-player.jsx';

const MovieCardWrapped = withAudioPlayer(MovieCard);

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
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    posterImg: PropTypes.string.isRequired,
    previewVid: PropTypes.string.isRequired,
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

export default MoviesList;
