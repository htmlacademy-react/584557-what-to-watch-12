import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/action';
import { filterFilmsByGenre } from '../../utils/films';
import { FilmsList } from '../films-list/films-list';

export const GenresList = () => {
  const activeGenre = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const genres = [
    ...new Set(films.reduce<string[]>((acc, { genre }) => {
      acc.push(genre);

      return acc;
    }, []))
  ];
  const filteredFilms = filterFilmsByGenre(films, activeGenre);

  const dispatch = useAppDispatch();


  return (
    <>
      <ul className="catalog__genres-list">
        {genres.map((genresItem) => (
          <li key={genresItem} className={`catalog__genres-item ${ genresItem === activeGenre ? 'catalog__genres-item--active' : ''}`}>
            <Link
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changeGenre(genresItem));
              }}
              to="#"
              className="catalog__genres-link"
            >
              {genresItem}
            </Link>
          </li>
        ))}
      </ul>

      <FilmsList films={filteredFilms}/>
    </>
  );
};
