import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { MAX_REVIEW_TEXT_LENGTH, MIN_REVIEW_TEXT_LENGTH } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectNewCommentLoadingFailed, selectNewCommentLoadingStatus } from '../../store/selectors';
import { RatingStars } from '../rating-stars/rating-stars';

export type TAddReviewFormState = { 'review-text': string; rating: number | null }

type TAddReviewFormProps = {
  rating: number;
  onFormSubmit: (data: TAddReviewFormState) => void;
}
export const AddReviewForm:FC<TAddReviewFormProps> = ({ rating: initRating, onFormSubmit }) => {
  const [state, setState] = useState<TAddReviewFormState>(
    {
      'review-text': '',
      rating: null
    }
  );

  const isLoading = useAppSelector(selectNewCommentLoadingStatus);
  const isRequestFailed = useAppSelector(selectNewCommentLoadingFailed);

  const rating = state.rating !== null ? Number(state.rating) : initRating;
  const reviewText = state['review-text'];
  const reviewTextLength = reviewText.length;

  const isSubmitDisabled = isLoading || state.rating === null ||
    reviewTextLength < MIN_REVIEW_TEXT_LENGTH ||
    reviewTextLength > MAX_REVIEW_TEXT_LENGTH;

  return (
    <form
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        !isSubmitDisabled && onFormSubmit(state);
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
      <RatingStars isDisabled={isLoading} rating={rating} />

      <div className="add-review__text">
        <textarea
          disabled={isLoading}
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

      {isRequestFailed && <p>Error! New commet not added! Try again!</p>}
    </form>
  );};
