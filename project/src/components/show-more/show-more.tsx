import { FC, PointerEventHandler } from 'react';

export const ShowMore:FC<{ handleClick: PointerEventHandler<HTMLButtonElement> }> = ({ handleClick }) => (
  <div className="catalog__more">
    <button onClick={handleClick} className="catalog__button" type="button">Show more</button>
  </div>
);
