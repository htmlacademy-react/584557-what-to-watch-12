import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { RatingStars } from '../rating-stars/rating-stars';

type TTAddReviewFormState = { 'review-text': string; rating: string }

type TAddReviewFormProps = {
  rating: number;
  onFormSubmit?: (state: TTAddReviewFormState) => void;
}
export const AddReviewForm:FC<TAddReviewFormProps> = ({ rating: initRating, onFormSubmit }) => {
  const [state, setState] = useState<TTAddReviewFormState>(
    {
      'review-text': '',
      'rating': String(initRating)
    }
  );

  const { rating } = state;
  const text = state['review-text'];

  return (
    <form
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onFormSubmit && onFormSubmit(state);
      }}
      onChange={(evt: ChangeEvent<HTMLFormElement>) => {
        const { name, value } = evt.target;

        setState((currentState) => ({
          ...currentState,
          [name]: value as string
        }));
      }}
      className="add-review__form"
    >
      <RatingStars rating={Number(rating)} />

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={text}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );};
