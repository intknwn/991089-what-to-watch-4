export const MAX_GENRES_COUNTER = 9;
export const MAX_MORE_LIKE_THIS_MOVIES_COUNTER = 4;
export const MOVIES_PER_PAGE = 8;

export const MOVIES_LIST_PLAYER_CONFIG = {
  autoPlay: true,
  muted: true,
  loop: true,
};

export const MOVIE_PAGE_PLAYER_CONFIG = {
  autoPlay: true,
  muted: false,
  loop: false,
};

export const Tab = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const Genre = {
  ALL_GENRES: `All genres`,
};

export const AuthStatus = {
  AUTH: `AUTH`,
  NOT_AUTH: `NOT_AUTH`,
};

export const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const ReviewForm = {
  MIN_REVIEW_LENGTH: 50,
  MAX_REVIEW_LENGTH: 400,
  MAX_RATE: 5,
};
