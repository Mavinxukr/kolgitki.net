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
