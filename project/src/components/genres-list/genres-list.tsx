import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/films/films';
import { selectActiveGenre, selectGenres } from '../../store/films/selectors';

export const GenresList = () => {
  const activeGenre = useAppSelector(selectActiveGenre);
  const genres = useAppSelector(selectGenres);

  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list" data-testid="genres-list">
      {genres.map((genresItem) => (
        <li data-testid="genres-list-item" key={genresItem} className={`catalog__genres-item ${ genresItem === activeGenre ? 'catalog__genres-item--active' : ''}`}>
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
  );
};
