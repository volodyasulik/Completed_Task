export function checkCurrendDate(date) {
  const currentDate = new Date();
  let inputDate = new Date(date);

  if (inputDate < currentDate) {
    return false;
  }
  return true;
}
