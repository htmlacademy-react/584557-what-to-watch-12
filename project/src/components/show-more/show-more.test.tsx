import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShowMore } from './show-more';
describe('Component: ShowMore', () => {
  it('should render correctly', async () => {
    const handleClick = jest.fn();

    render(
      <ShowMore handleClick={handleClick} />
    );

    const showMoreBtn = screen.getByText('Show more');
    expect(showMoreBtn).toBeInTheDocument();

    await userEvent.click(showMoreBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    await userEvent.click(showMoreBtn);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
