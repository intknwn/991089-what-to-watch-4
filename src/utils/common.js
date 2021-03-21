import moment from 'moment';

export const formatRuntime = (runtime) => moment({minute: runtime}).format(`h[H] m[M]`, {trim: `all`});

export const getGenres = (movies) => Array.from(new Set(movies.map((movie) => movie.genre)));
