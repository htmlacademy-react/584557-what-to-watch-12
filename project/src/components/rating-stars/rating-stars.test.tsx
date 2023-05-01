import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { STARS_RATING_LENGHT } from '../../const';
import { RatingStars } from './rating-stars';
describe('Component: RatingStars', () => {
  it('should render correctly', async () => {
    const onChangeMock = jest.fn();

    const { rerender } = render(
      <RatingStars rating={5} isDisabled={false} onChange={onChangeMock} />
    );

    expect(screen.getByTestId('rating-stars')).toBeInTheDocument();
    expect(screen.getAllByText(/Rating /).length).toEqual(STARS_RATING_LENGHT);

    const radioElements: HTMLInputElement[] = screen.getAllByRole('radio');
    expect(radioElements.length).toEqual(STARS_RATING_LENGHT);
    expect(radioElements.every((radioElement) => !radioElement.disabled)).toEqual(true);

    await act(async () => await userEvent.click(radioElements[0]));
    expect(onChangeMock).toBeCalledTimes(1);

    rerender(
      <RatingStars rating={5} isDisabled onChange={onChangeMock}/>
    );

    expect(radioElements.every((radioElement) => radioElement.disabled)).toEqual(true);
  });
});
