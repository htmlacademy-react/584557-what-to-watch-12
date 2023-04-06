import { TFilms } from './../types/film';

export const filterFilmsByGenre = (films: TFilms, genre: string) => {
  if(genre === 'All genres') {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
