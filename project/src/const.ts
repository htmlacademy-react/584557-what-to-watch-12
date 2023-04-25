
export enum AppRoute {
  Root = '/',
  Films = 'films/:id/:tabName?',
  Rewiew = 'films/:id/review',
  Login = '/login',
  MyList = '/mylist',
  Player = '/player/:id',
  NotFound = '/not-found'
}

export const STARS_RATING_LENGHT = 10;

export const MIN_REVIEW_TEXT_LENGTH = 50;
export const MAX_REVIEW_TEXT_LENGTH = 400;

export const PREVIEW_PALY_DELAY_MS = 1000;

export enum MovieTab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export const MAX_FILMS_PER_PAGE = 8;
export const MAX_RELATED_MOVIES_LIST_LENGTH = 4;

export const BASE_SERVER_URL = 'https://12.react.pages.academy/wtw';
export const REQUEST_TIMEOUT = 5000;

export enum ApiRoute {
  Films = '/films',
  SimilarFilms = '/similar',
  FilmComments = '/comments',
  Login = '/login'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const AUTH_TOKEN_KEY_NAME = 'WTW-token';

export const NOT_FOUND_STATUS_CODE = 404;


export enum NameSpace {
  Films = 'films',
  UserData = 'userData',
  NewComment = 'newComment',
  ActiveFilm = 'activeFilm'
}

export const DEFAULT_GENRE_FILTER = 'All genres';
