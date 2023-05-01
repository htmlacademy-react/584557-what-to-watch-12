import { FC, MouseEventHandler } from 'react';

export const FavoriteFilmBtn:FC<{
  isActive: boolean;
  counter: number;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ isActive, handleClick, counter }) => (
  <button
    onClick={handleClick}
    className="btn btn--list film-card__button"
    type="button"
    data-testid="favorite-film-btn"
  >
    <svg viewBox="0 0 19 20" width="19" height="20">
      <use data-testid={isActive ? 'active' : 'inactive'} xlinkHref={isActive ? '#in-list' : '#add'}></use>
    </svg>
    <span>My list</span>
    <span className="film-card__count">{counter}</span>
  </button>
);
