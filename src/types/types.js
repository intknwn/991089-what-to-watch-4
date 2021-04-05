import {string, number, bool, shape, func, arrayOf, oneOfType, instanceOf} from 'prop-types';

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

export const matchType = shape({
  params: shape({
    id: string,
  })
});

export const locationType = shape({
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: shape({}),
});

export const refType = oneOfType([
  func,
  shape({current: instanceOf(Element)})
]);
