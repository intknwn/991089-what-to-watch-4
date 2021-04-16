export const STATIC_RESOURSES_URL = `https://4.react.pages.academy`;

export const MAX_GENRES_COUNTER = 9;
export const MAX_MORE_LIKE_THIS_MOVIES_COUNTER = 4;
export const MOVIES_PER_PAGE = 8;

export const MOVIES_LIST_PLAYER_CONFIG = {
  autoPlay: true,
  muted: true,
  loop: true,
};

export const MOVIE_PAGE_PLAYER_CONFIG = {
  autoPlay: false,
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

export const AppRoute = {
  MAIN: `/`,
  SIGN_IN: `/sign-in`,
  MY_LIST: `/mylist`,
  REVIEW: `/review`,
  PLAYER: `/player`,
  MOVIE: `/movies`,
};

export const ClassName = {
  MOVIE_PAGE_HEADER: `page-header movie-card__head`,
  USER_PAGE_HEADER: `page-header user-page__head`,
  LOGO_LINK: `logo__link`,
  LOGO_LINK_LIGHT: `logo__link logo__link--light`,
};
