export const DateForm = (date) => {
  if (!date) {
    return null;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export const baseDateForm = (date) => {
  if (!date) {
    return null;
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${String(date.getDate()).length === 1 ? `0${date.getDate()}` : date.getDate()}`;
};
