import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export const formatRuntime = (runtime) => moment.duration(runtime, `minutes`).format(`h[H] m[M]`, {trim: `all`});
export const formatTimeLeft = (sec) => moment.duration(sec, `seconds`).format(`h:mm:ss`, {trim: `false`});
export const getGenres = (movies) => Array.from(new Set(movies.map((movie) => movie.genre)));
export const getProgress = (duration, currentTime) => Math.floor(currentTime * 100 / duration);
export const updateMovies = (movies, updatedMovie) => movies.map((movie) => movie.id === updatedMovie.id ? updatedMovie : movie);
export const groupReviews = (reviews) => {
  return reviews.reduce((acc, item) => {
    const lastArrayItem = acc[acc.length - 1];

    if (lastArrayItem.length < 3) {
      lastArrayItem.push(item);
      return acc;
    }

    return [...acc, [item]];
  }, [[]]);
};

