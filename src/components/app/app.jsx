import React from 'react';
import {string, func, bool, arrayOf} from 'prop-types';
import {Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReviewPage from '../add-review-page/add-review-page.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import withReviewForm from '../../hocs/with-review-form/with-review-form.jsx';
import {MOVIE_PAGE_PLAYER_CONFIG, AuthStatus, AppRoute} from '../../const.js';
import {movieType, reviewType} from '../../types/types.js';
import {Operation} from '../../store/action.js';
import {getMovies, getReviews, getPromoMovie, getMovieGenres} from '../../store/data/data-selectors.js';
import {getLoadingStatus} from '../../store/app/app-selectors.js';
import {getAuthStatus} from '../../store/user/user-selectors.js';
import history from '../../history.js';

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);
const AddReviewPageWrapped = withReviewForm(AddReviewPage);
class App extends React.PureComponent {

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const {
      movies,
      reviews,
      promoMovie,
      genres,
      isAuthorized,
      onSubmit,
      postReview,
      getMovieReviews,
      isLoading,
      setFavoriteStatus,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <Main
              promoMovie={promoMovie}
              movies={movies}
              genres={genres}
              isAuthorized={isAuthorized}
              setFavoriteStatus={setFavoriteStatus}
            />
          </Route>

          <Route exact path={AppRoute.SIGN_IN}>
            <SignIn onSubmit={onSubmit}/>
          </Route>

          <Route exact path={`${AppRoute.MOVIE}/:id${AppRoute.REVIEW}`}
            render={
              (routeProps) =>
                <AddReviewPageWrapped
                  {...routeProps}
                  movies={movies}
                  postReview={postReview}
                  isLoading={isLoading}
                />
            }/>

          <Route exact path={`${AppRoute.PLAYER}/:id`}
            render={
              (routeProps) =>
                <VideoPlayerWrapped
                  {...routeProps}
                  playerConfig={MOVIE_PAGE_PLAYER_CONFIG}
                />
            }/>

          <Route exact path={`${AppRoute.MOVIE}/:id`}
            render={(routeProps) =>
              <MoviePage
                {...routeProps}
                movies={movies}
                reviews={reviews}
                getMovieReviews={getMovieReviews}
                setFavoriteStatus={setFavoriteStatus}
              />
            }/>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: arrayOf(movieType).isRequired,
  reviews: arrayOf(reviewType).isRequired,
  promoMovie: movieType,
  genres: arrayOf(string).isRequired,
  isAuthorized: bool.isRequired,
  onSubmit: func.isRequired,
  postReview: func.isRequired,
  getMovieReviews: func.isRequired,
  isLoading: bool.isRequired,
  checkAuth: func.isRequired,
  setFavoriteStatus: func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  reviews: getReviews(state),
  promoMovie: getPromoMovie(state),
  genres: getMovieGenres(state),
  isAuthorized: getAuthStatus(state) === AuthStatus.AUTH,
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(userData) {
    dispatch(Operation.signIn(userData));
  },
  getMovieReviews(id) {
    dispatch(Operation.getReviews(id));
  },
  postReview(id, review, onSuccess) {
    dispatch(Operation.postReview(id, review, onSuccess));
  },
  checkAuth() {
    dispatch(Operation.getAuthStatus());
  },
  setFavoriteStatus(id, isFavorite) {
    dispatch(Operation.setFavoriteStatus(id, isFavorite));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
