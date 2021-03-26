export const ActionType = {
  SET_MOVIES_GENRE: `SET_MOVIES_GENRE`,
  SET_MOVIES: `SET_MOVIES`,
  SET_PROMO_MOVIE: `SET_PROMO_MOVIE`,
  INC_MOVIES_PER_PAGE: `INC_MOVIES_PER_PAGE`,
  RESET_MOVIES_PER_PAGE: `RESET_MOVIES_PER_PAGE`,
  SELECT_MOVIE: `SELECT_MOVIE`,
  PLAY_MOVIE: `PLAY_MOVIE`,
};

export const ActionCreator = {
  setMoviesGenre: (genre) => ({
    type: ActionType.SET_MOVIES_GENRE,
    payload: genre,
  }),
  setMovies: (movies) => ({
    type: ActionType.SET_MOVIES,
    payload: movies,
  }),
  setPromoMovie: (movie) => ({
    type: ActionType.SET_PROMO_MOVIE,
    payload: movie,
  }),
  incrementMoviesPerPage: () => ({
    type: ActionType.INC_MOVIES_PER_PAGE,
  }),
  resetMoviesPerPage: () => ({
    type: ActionType.RESET_MOVIES_PER_PAGE,
  }),
  selectMovie: (movie) => ({
    type: ActionType.SELECT_MOVIE,
    payload: movie,
  }),
  playMovie: () => ({
    type: ActionType.PLAY_MOVIE,
  }),
};
