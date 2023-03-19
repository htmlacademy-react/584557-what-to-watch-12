import { FC, Fragment } from 'react';
import { STARS_RATING_LENGHT } from '../../const';

export const RatingStars:FC<{ rating: number }> = ({ rating }) => (
  <div className="rating">
    <div className="rating__stars">
      {Array(STARS_RATING_LENGHT).fill('').map((_, idx) => {
        const ratingId = STARS_RATING_LENGHT - idx;
        const isChecked = ratingId === Math.round(rating);

        return (
          <Fragment key={ratingId}>
            <input
              className="rating__input"
              id={`star-${ratingId}`}
              type="radio"
              name="rating"
              value={ratingId}
              defaultChecked={isChecked}
            />
            <label className="rating__label" htmlFor={`star-${ratingId}`}>Rating {ratingId}</label>
          </Fragment>
        );})}
    </div>
  </div>
);
