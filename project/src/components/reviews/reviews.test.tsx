import { screen, render } from '@testing-library/react';
import { makeFakeCommentsStub } from '../../utils/mocks';
import { Reviews } from './reviews';
describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const fakeComments = makeFakeCommentsStub();

    const { rerender } = render(
      <Reviews filmComments={fakeComments} />
    );

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getAllByTestId('review').length).toEqual(fakeComments.length);

    rerender(
      <Reviews filmComments={[]} />
    );

    expect(screen.getByText('No comments yet...')).toBeInTheDocument();
  });
});
