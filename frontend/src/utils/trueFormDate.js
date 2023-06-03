export const trueFormDate = (str, format) => {
  let trueFormatDate;

  const date = new Date(str);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (!isNaN(year) || !isNaN(month) || !isNaN(day)) {
    trueFormatDate = `${year}-${month}-${day}`;
  } else {
    trueFormatDate = null;
  }
  if (format) {
    trueFormatDate = `${day}-${month}-${year}`;
  }
  return trueFormatDate;
};
