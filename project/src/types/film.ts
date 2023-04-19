import { TComments } from './comment';
export type TFilm = {
  'name': string;
  'posterImage': string;
  'previewImage': string;
  'backgroundImage': string;
  'backgroundColor': string;
  'description': string;
  'rating': number;
  'scoresCount': number;
  'director': string;
  'starring': string[];
  'runTime': number;
  'genre': string;
  'released': number;
  'id': number;
  'isFavorite': false;
  'videoLink': string;
  'previewVideoLink': string;
}

export type TFilms = TFilm[];

export type TActiveFilmData = {
  film: TFilm;
  similarFilms: TFilms;
  filmComments: TComments;
}
