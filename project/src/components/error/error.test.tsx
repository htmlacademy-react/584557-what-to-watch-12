import { Error } from './error';
import { render, screen } from '@testing-library/react';

describe('Component: Error', () => {
  it('should render correctly', () => {
    render(<Error />);

    const errorElement = screen.getByText('Network error. Try reload Page');

    expect(errorElement).toBeInTheDocument();
  });
});
