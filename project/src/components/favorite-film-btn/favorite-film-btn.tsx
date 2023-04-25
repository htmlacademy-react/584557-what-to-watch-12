import { FC, MouseEventHandler } from 'react';

export const FavoriteFilmBtn:FC<{
  isActive: boolean;
  counter: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ isActive, onClick, counter }) => (
  <button
    onClick={onClick}
    className="btn btn--list film-card__button"
    type="button"
  >
    <svg viewBox="0 0 19 20" width="19" height="20">
      <use xlinkHref={isActive ? '#in-list' : '#add'}></use>
    </svg>
    <span>My list</span>
    <span className="film-card__count">{counter}</span>
  </button>
);
