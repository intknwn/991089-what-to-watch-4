export const ActionType = {
  SET_MOVIES_GENRE: `SET_MOVIES_GENRE`,
  SET_MOVIES: `SET_MOVIES`,
  INC_MOVIES_PER_PAGE: `INC_MOVIES_PER_PAGE`,
  RESET_MOVIES_PER_PAGE: `RESET_MOVIES_PER_PAGE`,
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
  incrementMoviesPerPage: () => ({
    type: ActionType.INC_MOVIES_PER_PAGE,
  }),
  resetMoviesPerPage: () => ({
    type: ActionType.RESET_MOVIES_PER_PAGE,
  }),
};
