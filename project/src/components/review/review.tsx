import { FC } from 'react';
import { TComment } from '../../types/comment';
import { toMMMMDDYYYY, toYYYYMMDD } from '../../utils/date-time-formatters';

export const Review:FC<{ review: TComment }> = ({ review }) => {
  const { comment, date, rating, user: { name } } = review;

  return(
    <div className="review" data-testid="review">
      <blockquote className="review__quote">
        <p className="review__text">{ comment }</p>

        <footer className="review__details">
          <cite className="review__author">{ name }</cite>
          <time className="review__date" dateTime={ toYYYYMMDD(date) }>{ toMMMMDDYYYY(date) }</time>
        </footer>
      </blockquote>

      <div className="review__rating">{ String(rating).replace(',', '.') }</div>
    </div>
  );
};
