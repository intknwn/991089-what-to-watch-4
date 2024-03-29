import NameSpace from '../namespace.js';

export const getMoviesPerPage = (state) => state[NameSpace.APP].moviesPerPage;

export const getSelectedGenre = (state) => state[NameSpace.APP].selectedGenre;

export const getPlaybackStatus = (state) => state[NameSpace.APP].isPlaying;

export const getLoadingStatus = (state) => state[NameSpace.APP].isLoading;

