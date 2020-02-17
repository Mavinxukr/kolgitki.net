import { getNewPostData } from '../services/order';

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

export const getArrOptionsCities = async (value) => {
  if (value.length > 0) {
    const result = await getNewPostData({
      params: {},
      calledMethod: 'searchSettlements',
      filterObject: {
        CityName: value,
        Limit: 8,
      },
      modelName: 'Address',
    }).then(response => response.data[0].Addresses.filter(item => item.Warehouses > 0).map(
      item => ({
        value: item.Ref,
        label: item.MainDescription,
      }),
    ));
    return result;
  }
};

export const getNewPostOffice = (e, setArrOptions) => {
  getNewPostData({
    params: {},
    calledMethod: 'getWarehouses',
    filterObject: {
      CityName: e.label,
    },
    modelName: 'AddressGeneral',
  }).then(response => setArrOptions(
    response.data.map(item => ({
      value: item.Description,
      label: item.Description,
    })),
  ));
};
