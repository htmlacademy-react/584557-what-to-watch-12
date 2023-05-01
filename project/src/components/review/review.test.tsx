import { screen, render } from '@testing-library/react';
import { toMMMMDDYYYY, toYYYYMMDD } from '../../utils/date-time-formatters';
import { makeFakeCommentStub } from '../../utils/mocks';
import { Review } from './review';
describe('Component: Review', () => {
  it('should render correctly', () => {
    const fakeComment = makeFakeCommentStub();

    render(
      <Review review={fakeComment} />
    );

    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(String(fakeComment.rating).replace(',', '.'))).toBeInTheDocument();

    const timeElement: HTMLTimeElement = screen.getByText(toMMMMDDYYYY(fakeComment.date));
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.dateTime).toEqual(toYYYYMMDD(fakeComment.date));
  });
});
