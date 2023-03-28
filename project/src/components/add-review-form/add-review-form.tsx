import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { MAX_REVIEW_TEXT_LENGTH, MIN_REVIEW_TEXT_LENGTH } from '../../const';
import { RatingStars } from '../rating-stars/rating-stars';

type TTAddReviewFormState = { 'review-text': string; rating: string | null }

type TAddReviewFormProps = {
  rating: number ;
  onFormSubmit?: (state: TTAddReviewFormState) => void;
}
export const AddReviewForm:FC<TAddReviewFormProps> = ({ rating: initRating, onFormSubmit }) => {
  const [state, setState] = useState<TTAddReviewFormState>(
    {
      'review-text': '',
      'rating': null
    }
  );

  const rating = state.rating !== null ? Number(state.rating) : initRating;
  const reviewText = state['review-text'];
  const reviewTextLength = reviewText.length;

  const isSubmitDisabled = state.rating === null ||
    reviewTextLength < MIN_REVIEW_TEXT_LENGTH ||
    reviewTextLength > MAX_REVIEW_TEXT_LENGTH;

  return (
    <form
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        !isSubmitDisabled && onFormSubmit && onFormSubmit(state);
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
      <RatingStars rating={rating} />

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          minLength={MIN_REVIEW_TEXT_LENGTH}
          maxLength={MAX_REVIEW_TEXT_LENGTH}
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={reviewText}
          required
        >
        </textarea>
        <div className="add-review__submit">
          <button disabled={isSubmitDisabled} className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );};
