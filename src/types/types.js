import {string, number, shape, arrayOf} from 'prop-types';

export const promoMovieType = shape({
  name: string.isRequired,
  year: number.isRequired,
  genre: string.isRequired,
});

export const movieType = shape({
  name: string.isRequired,
  backgroundImg: string.isRequired,
  posterImg: string.isRequired,
  previewVid: string.isRequired,
  genre: string.isRequired,
  year: number.isRequired,
  rating: number.isRequired,
  score: number.isRequired,
  description: string.isRequired,
  director: string.isRequired,
  cast: arrayOf(string).isRequired,
});

export const reviewType = shape({
  id: number.isRequired,
  user: shape({
    id: number.isRequired,
    name: string.isRequired,
  }),
  rating: number.isRequired,
  comment: string.isRequired,
  date: string.isRequired,
});

