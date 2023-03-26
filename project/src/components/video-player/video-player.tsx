import { forwardRef } from 'react';

const VideoPlayer = forwardRef<HTMLVideoElement, { src: string }>(
  ({ src }, ref) => (
    <video ref={ref} src={src} width="280" height="175" autoPlay muted loop/>
  )
);

VideoPlayer.displayName = 'VideoPlayer';

export { VideoPlayer };
