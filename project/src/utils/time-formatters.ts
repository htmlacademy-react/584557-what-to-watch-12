export const fromSecToFilmDuration = (seconds: number) => {
  const dateString = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? dateString.substring(14, 19) : dateString.substring(11, 16);
};

export const getRuntimeString = (runTimeMinutes: number) => {
  const hours = Math.trunc(runTimeMinutes / 60);
  const minutes = runTimeMinutes - Math.trunc(runTimeMinutes / 60) * 60;
  const a = `${hours}h ${minutes}m`;

  return a;
};
