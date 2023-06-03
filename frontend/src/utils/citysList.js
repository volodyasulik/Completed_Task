export function citysList(obj) {
  let options = [{ value: null, label: "-" }];
  if (obj) {
    obj.data.forEach((el) => {
      options.push({ value: el.id, label: el.City });
    });
  }
  return options;
}
