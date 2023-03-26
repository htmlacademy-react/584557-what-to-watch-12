import { FC } from 'react';

export const VideoPlayer:FC<{ src: string }> = ({ src }) => (
  <video src={src} width="280" height="175" autoPlay muted loop/>
);
