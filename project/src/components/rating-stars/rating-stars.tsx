import { ChangeEvent, FC, Fragment } from 'react';
import { STARS_RATING_LENGHT } from '../../const';

export const RatingStars:FC<{
  rating: number;
  isDisabled: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}> = ({ rating, isDisabled, onChange }) => (
  <div className="rating" data-testid="rating-stars">
    <div className="rating__stars">
      {Array(STARS_RATING_LENGHT).fill('').map((_, idx) => {
        const ratingId = STARS_RATING_LENGHT - idx;
        const isChecked = ratingId === Math.round(rating);

        return (
          <Fragment key={ratingId}>
            <input
              disabled={isDisabled}
              className="rating__input"
              id={`star-${ratingId}`}
              type="radio"
              name="rating"
              value={ratingId}
              defaultChecked={isChecked}
              onChange={onChange}
            />
            <label className="rating__label" htmlFor={`star-${ratingId}`}>Rating {ratingId}</label>
          </Fragment>
        );})}
    </div>
  </div>
);
