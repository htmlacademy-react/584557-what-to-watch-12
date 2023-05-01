import { screen, render } from '@testing-library/react';
import { Spinner } from './spinner';
describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(
      <Spinner />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
