import React from 'react';
import {arrayOf, bool, func, string} from 'prop-types';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {AddReviewPage, Main, MoviePage, MyList, PrivateRoute, SignIn, VideoPlayer} from '../components.jsx';
import {withReviewForm, withSignInForm, withVideoPlayer} from '../../hocs/hocs.js';
import {movieType, reviewType, userType} from '../../types/types.js';
import {Operation} from '../../store/action.js';
import {getAuthStatus, getFavoriteMovies, getLoadingStatus, getMovieGenres, getPromoMovie, getReviews, getUser, getMovies} from '../../store/selectors.js';
import {AppRoute, AuthStatus, MOVIE_PAGE_PLAYER_CONFIG} from '../../const.js';
import history from '../../history.js';

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);
const AddReviewPageWrapped = withReviewForm(AddReviewPage);
const SignInWrapped = withSignInForm(SignIn);
class App extends React.PureComponent {

  componentDidMount() {
    const {isAuthorized, getMyListMovies} = this.props;

    if (isAuthorized) {
      getMyListMovies();
    }
  }

  render() {
    const {
      favoriteMovies,
      genres,
      getMovieReviews,
      isAuthorized,
      isLoading,
      movies,
      onSubmit,
      postReview,
      promoMovie,
      reviews,
      setFavoriteStatus,
      user,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.SIGN_IN}
            render={
              (routeProps) =>
                isAuthorized ?
                  <Redirect to={AppRoute.MAIN}/> :
                  <SignInWrapped
                    {...routeProps}
                    isAuthorized={isAuthorized}
                    onSubmit={onSubmit}
                    user={user}
                  />
            }/>

          <PrivateRoute exact path={`${AppRoute.MOVIE}/:id${AppRoute.REVIEW}`} isAuthorized={isAuthorized}
            render={
              (routeProps) =>
                <AddReviewPageWrapped
                  {...routeProps}
                  movies={movies}
                  postReview={postReview}
                  isLoading={isLoading}
                  isAuthorized={isAuthorized}
                  user={user}
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
                isAuthorized={isAuthorized}
                user={user}
              />
            }/>

          <PrivateRoute exact path={AppRoute.MY_LIST} isAuthorized={isAuthorized}
            render={
              (routeProps) =>
                <MyList
                  {...routeProps}
                  movies={favoriteMovies}
                  isAuthorized={isAuthorized}
                  user={user}
                />
            }/>

          <Route path="">
            <Main
              promoMovie={promoMovie}
              movies={movies}
              genres={genres}
              isAuthorized={isAuthorized}
              user={user}
              setFavoriteStatus={setFavoriteStatus}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  favoriteMovies: arrayOf(movieType).isRequired,
  genres: arrayOf(string).isRequired,
  getMovieReviews: func.isRequired,
  getMyListMovies: func.isRequired,
  isAuthorized: bool.isRequired,
  isLoading: bool.isRequired,
  movies: arrayOf(movieType).isRequired,
  onSubmit: func.isRequired,
  postReview: func.isRequired,
  promoMovie: movieType,
  reviews: arrayOf(reviewType).isRequired,
  setFavoriteStatus: func.isRequired,
  user: userType,
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
  genres: getMovieGenres(state),
  isAuthorized: getAuthStatus(state) === AuthStatus.AUTH,
  isLoading: getLoadingStatus(state),
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
  reviews: getReviews(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMovieReviews(id) {
    dispatch(Operation.getReviews(id));
  },
  getMyListMovies() {
    dispatch(Operation.getFavoriteMovies());
  },
  onSubmit(userData, onSuccess, onError) {
    dispatch(Operation.signIn(userData, onSuccess, onError));
  },
  postReview(id, review, onSuccess) {
    dispatch(Operation.postReview(id, review, onSuccess));
  },
  setFavoriteStatus(id, isFavorite) {
    dispatch(Operation.setFavoriteStatus(id, isFavorite));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
