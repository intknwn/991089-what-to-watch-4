import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';

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
        {movies.map((movieData) => <MovieCard key={movieData.name} movie={movieData} onClick={onTitleClickHandler} onHover={this.movieCardHoverHandler} />)}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImg: PropTypes.string.isRequired,
  })).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
};

export default MoviesList;
