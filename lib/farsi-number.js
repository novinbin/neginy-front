export const farsiNumber = (number) => {
  if (!number && number !== 0) {
    return null;
  }

  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return number.toString().replace(/\d/g, (x) => farsiDigits[x]);
};
