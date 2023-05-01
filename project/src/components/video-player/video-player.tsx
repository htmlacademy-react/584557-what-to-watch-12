import { FC } from 'react';

export const VideoPlayer:FC<{ src: string }> = ({ src }) => (
  <video data-testid="video-player" src={src} width="280" height="175" autoPlay muted loop/>
);
