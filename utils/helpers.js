export const createArrForRequestProducts = name => (
  JSON.parse(localStorage.getItem(name)).map(item => item.id).join(',')
);

export const calculateBonusSum = (bonuses) => {
  let sum = 0;
  if (bonuses) {
    for (let i = 0; i < bonuses.length; i += 1) {
      sum += bonuses[i].count;
    }
  }
  return sum;
};

export const calculateTotalSum = (cartData, products) => {
  let sum = 0;
  const arrProducts = !cartData.length ? products : cartData;
  for (let i = 0; i < arrProducts.length; i += 1) {
    const item = arrProducts[i].good || arrProducts[i];
    const count = arrProducts[i].good
      ? arrProducts[i].count
      : JSON.parse(localStorage.getItem('arrOfIdProduct'))[0].count;
    sum += item.price * count;
  }
  return sum;
};
