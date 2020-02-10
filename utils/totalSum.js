export const calculateTotalSum = (cartData) => {
  let sum = 0;
  for (let i = 0; i < cartData.length; i += 1) {
    sum += cartData[i].good.price * cartData[i].count;
  }
  return sum;
};
