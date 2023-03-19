export const fromSecToFilmDuration = (seconds: number) => {
  const dateString = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? dateString.substring(14, 19) : dateString.substring(11, 16);
};
