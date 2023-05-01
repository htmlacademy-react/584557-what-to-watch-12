import { FavoriteFilmBtn } from './favorite-film-btn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: FavoriteFilmBtn', () => {
  const isActive = true;
  const counter = 3;
  const handleClick = jest.fn();
  it('should render correctly in active state', () => {
    render(<FavoriteFilmBtn isActive={isActive} counter={counter} handleClick={handleClick} />);

    const btnTextElement = screen.getByText('My list');
    const btnCounterElement = screen.getByText('3');
    const iconElement = screen.getByTestId('active');

    expect(btnTextElement).toBeInTheDocument();
    expect(btnCounterElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('should render correctly in active/inactive state', () => {
    const { rerender } = render(
      <FavoriteFilmBtn isActive={false} counter={counter} handleClick={handleClick} />);

    expect(screen.getByTestId('inactive')).toBeInTheDocument();

    rerender(
      <FavoriteFilmBtn isActive counter={counter} handleClick={handleClick} />
    );

    expect(screen.getByTestId('active')).toBeInTheDocument();
  });

  it('handleClick should called when user click button', async () => {
    render(<FavoriteFilmBtn isActive={isActive} counter={counter} handleClick={handleClick} />);

    const btnElement = screen.getByTestId('favorite-film-btn');

    await userEvent.click(btnElement);

    expect(handleClick).toBeCalled();
  });
});
