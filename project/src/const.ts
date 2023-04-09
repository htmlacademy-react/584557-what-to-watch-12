
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
  Details = 'Details',
  Reviews = 'Reviews',
  Overview = 'Overview'
}

export const MAX_FILMS_PER_PAGE = 8;
export const MAX_RELATED_MOVIES_LIST_LENGTH = 4;

export const BASE_SERVER_URL = 'https://12.react.pages.academy/wtw';
export const REQUEST_TIMEOUT = 5000;

export enum ApiRoute {
  Films = '/films'
}
