export const createArrForRequestProducts = name => (
  JSON.parse(localStorage.getItem(name)).map(item => item.id).join(',')
);
