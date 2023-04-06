import { TFilms } from './../types/film';

export const getFilmsGenres = (films: TFilms) => [
  'All genres',
  ...new Set(films.reduce<string[]>((acc, { genre }) => {
    acc.push(genre);

    return acc;
  }, []))
];
