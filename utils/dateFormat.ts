export const formatTimestamp = (timestamp: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};
