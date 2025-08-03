export const debounce = (callback: () => void, ms: number): (() => void) => {
  const timeoutId = setTimeout(() => callback(), ms);
  return () => clearTimeout(timeoutId);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return `Updated on ${formattedDate}`;
};
