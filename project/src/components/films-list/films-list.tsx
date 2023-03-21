import { FC, useState } from 'react';
import { TFilms } from '../../types/film';
import FilmCard from '../film-card/film-card';

export const FilmsList: FC<{ films: TFilms }> = ({films}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            isActive={activeCardId === String(film.id)}
            setActiveCardId={setActiveCardId}
          />
        ))
      }
    </div>
  );
};

