export const fromSecToFilmDuration = (seconds: number) => {
  if(seconds < 0) {
    seconds *= -1;
  }

  const dateString = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? dateString.substring(14, 19) : dateString.substring(11, 16);
};

export const getRuntimeString = (runTimeMinutes: number) => {
  if(runTimeMinutes < 0) {
    runTimeMinutes *= -1;
  }

  const hours = Math.trunc(runTimeMinutes / 60);
  const minutes = runTimeMinutes - Math.trunc(runTimeMinutes / 60) * 60;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const toYYYYMMDD = (dateString: string) => (new Date(dateString)).toISOString().split('T')[0];

export const toMMMMDDYYYY = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };

  return date.toLocaleDateString('en-US', options);
};
