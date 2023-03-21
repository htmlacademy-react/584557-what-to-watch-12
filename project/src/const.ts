export enum AppRoute {
  Root = '/',
  Films = 'films/:id',
  Rewiew = 'films/:id/review',
  Login = '/login',
  MyList = '/mylist',
  Player = '/player/:id',
  NotFound = '/not-found'
}

export const STARS_RATING_LENGHT = 10;

export const GENRES = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers'
];
