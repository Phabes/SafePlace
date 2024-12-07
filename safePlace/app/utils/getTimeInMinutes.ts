export const getTimeInMinutes = (date: Date) => {
  return Math.ceil(date.getTime() / 60 / 1000);
};
