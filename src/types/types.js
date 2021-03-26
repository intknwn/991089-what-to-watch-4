import {string, number, bool, shape, arrayOf} from 'prop-types';

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

export const videoType = shape({
  autoPlay: bool,
  muted: bool,
  loop: bool,
});

