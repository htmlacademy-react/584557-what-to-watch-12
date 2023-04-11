import { FC, useEffect, useState } from 'react';
import { MAX_FILMS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectActiveGenre, selectFilmsByGenre } from '../../store/selectors';

import FilmCard from '../film-card/film-card';
import { ShowMore } from '../show-more/show-more';

export const FilmsList: FC<{ maxRenderedItems?: number }> = (
  { maxRenderedItems }) => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const [filmsListPage, setFilmsListPage] = useState(1);
  const filmsAmountForRender = filmsListPage * MAX_FILMS_PER_PAGE;

  const activeGenre = useAppSelector(selectActiveGenre);
  const filteredFilms = useAppSelector(selectFilmsByGenre);

  useEffect(() => {
    setFilmsListPage(1);
  }, [activeGenre]);

  const filmsToRender = maxRenderedItems
    ? filteredFilms.slice(0, maxRenderedItems)
    : filteredFilms;

  const isShowMoreBtnHidden = filteredFilms.length < filmsAmountForRender;

  return (
    <>
      <div className="catalog__films-list">
        {
          filmsToRender.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              isActive={activeCardId === film.id}
              setActiveCardId={setActiveCardId}
            />
          ))
        }
      </div>

      {!isShowMoreBtnHidden && <ShowMore onClick={() => setFilmsListPage((s) => s + 1)}/>}
    </>
  );
};

