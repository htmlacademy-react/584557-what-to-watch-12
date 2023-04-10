import { FC, PointerEventHandler } from 'react';

export const ShowMore:FC<{ onClick: PointerEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <div className="catalog__more">
    <button onClick={onClick} className="catalog__button" type="button">Show more</button>
  </div>
);
