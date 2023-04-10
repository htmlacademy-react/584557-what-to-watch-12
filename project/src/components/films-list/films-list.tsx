import { FC, useState } from 'react';
import { TFilms } from '../../types/film';
import FilmCard from '../film-card/film-card';

export const FilmsList: FC<{ films: TFilms; maxRenderedItems?: number }> = (
  { films, maxRenderedItems }) => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const filmsToRender = maxRenderedItems
    ? films.slice(0, maxRenderedItems)
    : films;

  return (
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
  );
};

