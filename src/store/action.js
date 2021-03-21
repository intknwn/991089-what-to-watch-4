export const ActionType = {
  SET_MOVIES_GENRE: `SET_MOVIES_GENRE`,
  SET_MOVIES: `SET_MOVIES`,
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
};
