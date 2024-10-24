export const capitalize = (str: string | undefined) => {
  if (!str) return '';

  return (
    str.charAt(0).toUpperCase() +
    (str.slice(1) === str.slice(1).toUpperCase()
      ? str.slice(1).toLowerCase()
      : str.slice(1))
  );
};

export const getDateTime = (date: string) => {
  const dateTime = new Date(date);
  return dateTime.toLocaleString();
};
