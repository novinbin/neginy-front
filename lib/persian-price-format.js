export const removeChar = (i, str) => {
  if (str === "" || str === undefined) {
    return "";
  }
  let tmp = str.split("");
  let newTmp = "";

  newTmp = tmp.filter((c) => c !== i);

  return newTmp.join("");
};

export const persianPriceFormat = (price) => {
  if (!price && price !== 0) {
    return null;
  }
  const formattedPrice = price.toLocaleString("fa-IR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedPrice;
};

export const separatePrice = (price) => {
  if (!price) {
    return null;
  }

  let newPrice = removeChar(",", String(price));

  const formattedPrice = newPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedPrice;
};
