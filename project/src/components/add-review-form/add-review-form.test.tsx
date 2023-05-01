import { AddReviewForm } from './add-review-form';
import { render, screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MIN_REVIEW_TEXT_LENGTH, NameSpace, STARS_RATING_LENGHT } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: AddReviewForm', () => {
  it('should render correctly', async () => {
    const store = mockStore({
      [NameSpace.NewComment]: {
        isLoading: false,
        error: false,
      },
    });

    const handleSubmit = jest.fn();
    const fakeRating = 3.9;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm handleFormSubmit={handleSubmit} rating={fakeRating} />
        </HistoryRouter>
      </Provider>
    );

    const submitBtnElement: HTMLButtonElement = screen.getByText('Post');
    const commentTextareaElement: HTMLTextAreaElement = screen.getByPlaceholderText('Review text');
    const ratingRadioElements: HTMLInputElement[] = screen.getAllByLabelText(/Rating /);

    expect(submitBtnElement).toBeInTheDocument();
    expect(Boolean(submitBtnElement.disabled)).toEqual(true);

    expect(commentTextareaElement).toBeInTheDocument();
    expect(Boolean(commentTextareaElement.disabled)).toEqual(false);
    const testComment = 'test comment';
    await act(async () => await userEvent.type(commentTextareaElement, testComment));
    expect(screen.getByDisplayValue(testComment)).toBeInTheDocument();

    expect(ratingRadioElements.length).toEqual(STARS_RATING_LENGHT);
    expect(
      ratingRadioElements.every((ratingRadioElement) => Boolean(ratingRadioElement.disabled))
    ).toEqual(false);

    expect(ratingRadioElements[STARS_RATING_LENGHT - Math.round(fakeRating)]).toBeChecked();
  });

  it('disabled when loading/error', () => {
    let store = mockStore({
      newComment: {
        isLoading: true,
        error: false,
      },
    });

    const handleSubmit = jest.fn();
    const fakeRating = 3.9;

    const { rerender } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm handleFormSubmit={handleSubmit} rating={fakeRating} />
        </HistoryRouter>
      </Provider>
    );

    const submitBtnElement: HTMLButtonElement = screen.getByText('Post');
    const commentTextareaElement: HTMLTextAreaElement = screen.getByPlaceholderText('Review text');
    const ratingRadioElements: HTMLInputElement[] = screen.getAllByLabelText(/Rating /);

    expect(Boolean(submitBtnElement.disabled)).toEqual(true);
    expect(Boolean(commentTextareaElement.disabled)).toEqual(true);
    expect(
      ratingRadioElements.every((ratingRadioElement) => Boolean(ratingRadioElement.disabled))
    ).toEqual(true);

    store = mockStore({
      newComment: {
        isLoading: false,
        error: true,
      },
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm handleFormSubmit={handleSubmit} rating={fakeRating} />
        </HistoryRouter>
      </Provider>
    );

    const errorElement = screen.getByText('Error! New commet not added! Try again!');
    expect(errorElement).toBeInTheDocument();

    expect(Boolean(submitBtnElement.disabled)).toEqual(true);
    expect(Boolean(commentTextareaElement.disabled)).toEqual(false);
    expect(
      ratingRadioElements.every((ratingRadioElement) => Boolean(ratingRadioElement.disabled))
    ).toEqual(false);
  });

  it('should render correctly after user comment input and set rating', async () => {
    const store = mockStore({
      [NameSpace.NewComment]: {
        isLoading: false,
        error: false,
      },
    });

    const handleSubmit = jest.fn();
    const fakeRating = 3.9;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm handleFormSubmit={handleSubmit} rating={fakeRating} />
        </HistoryRouter>
      </Provider>
    );

    const submitBtnElement: HTMLButtonElement = screen.getByText('Post');
    const commentTextareaElement: HTMLTextAreaElement = screen.getByPlaceholderText('Review text');
    const ratingRadioElements: HTMLInputElement[] = screen.getAllByLabelText(/Rating /);

    let fakeUserComment = '#'.repeat(MIN_REVIEW_TEXT_LENGTH - 1);
    await act(async () => await userEvent.type(commentTextareaElement, fakeUserComment));
    expect(Boolean(submitBtnElement.disabled)).toEqual(true);

    await act(async () => await userEvent.click(ratingRadioElements[STARS_RATING_LENGHT - 1]));
    expect(Boolean(submitBtnElement.disabled)).toEqual(true);

    fakeUserComment = '#'.repeat(MIN_REVIEW_TEXT_LENGTH);
    await act(async () => await userEvent.type(commentTextareaElement, fakeUserComment));
    expect(Boolean(submitBtnElement.disabled)).toEqual(false);
  });

  it('should call handleFormSubmit with correct data', async () => {
    const store = mockStore({
      [NameSpace.NewComment]: {
        isLoading: false,
        error: false,
      },
    });

    const handleSubmit = jest.fn();
    const fakeRating = 3.9;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm handleFormSubmit={handleSubmit} rating={fakeRating} />
        </HistoryRouter>
      </Provider>
    );

    const submitBtnElement: HTMLButtonElement = screen.getByText('Post');
    const commentTextareaElement: HTMLTextAreaElement = screen.getByPlaceholderText('Review text');
    const ratingRadioElements: HTMLInputElement[] = screen.getAllByLabelText(/Rating /);

    await act(async () => await userEvent.click(submitBtnElement));
    expect(handleSubmit).not.toBeCalled();

    const incorrectLengthTestComment = '#'.repeat(MIN_REVIEW_TEXT_LENGTH - 1);
    await act(async () => await userEvent.type(commentTextareaElement, incorrectLengthTestComment));
    await act(async () => await userEvent.click(submitBtnElement));
    expect(handleSubmit).not.toBeCalled();

    await act(async () => await userEvent.click(ratingRadioElements[STARS_RATING_LENGHT - 1]));
    await act(async () => await userEvent.click(submitBtnElement));
    expect(handleSubmit).not.toBeCalled();

    const correctLengthTestComment = '#'.repeat(MIN_REVIEW_TEXT_LENGTH);
    await act(async () => await userEvent.type(commentTextareaElement, correctLengthTestComment));
    await act(async () => await userEvent.click(submitBtnElement));

    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toBeCalledWith({ comment: correctLengthTestComment + incorrectLengthTestComment, rating: Number(ratingRadioElements[STARS_RATING_LENGHT - 1].value) });
  });
});
