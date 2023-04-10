import { FC } from 'react';
import { TFilm } from '../../types/film';
import { getRaitingText } from '../../utils/common';

export const Overview:FC<{ film: TFilm }> = ({ film }) => {
  const { rating, scoresCount, description, director, starring } = film;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{String(rating).replace('.', ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRaitingText(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
};
