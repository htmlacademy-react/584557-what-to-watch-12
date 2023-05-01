import { screen, render } from '@testing-library/react';
import { VideoPlayer } from './video-player';
describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    const testSrc = '/test';
    render(
      <VideoPlayer src={testSrc} />
    );

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
