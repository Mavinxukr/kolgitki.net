import {
  getNewPostData,
  getShopCities,
  getShopByCity,
} from '../services/order';
import { addToCart } from '../redux/actions/cart';
import { cookies } from './getCookies';

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
    const count = arrProducts[i].count
      ? arrProducts[i].count
      : JSON.parse(localStorage.getItem('arrOfIdProduct'))[i].count;
    sum += arrProducts[i].good.new_price * count || arrProducts[i].good.price * count;
  }
  return +sum.toFixed(2);
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

export const getCitiesShops = (setArrOptionsCitiesShops) => {
  getShopCities({}).then(response => setArrOptionsCitiesShops(
    response.data.map(item => ({
      value: item,
      label: item,
    })),
  ));
};

export const getCityShops = (setArrOptionsShops, cityRef) => {
  getShopByCity({ city: cityRef }).then(response => setArrOptionsShops(
    response.data.map(item => ({
      value: item.id,
      label: item.address,
    })),
  ));
};

export const saveToken = (shouldRememberedUser, token) => {
  if (shouldRememberedUser) {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 * 30 });
  } else {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 });
  }
};

export const addToCartFromLocale = (dispatch) => {
  if (localStorage.getItem('arrOfIdProduct')) {
    dispatch(
      addToCart({
        params: {},
        body: {
          goods: localStorage.getItem('arrOfIdProduct'),
        },
        isAddDataByArray: true,
      }),
    );
    localStorage.removeItem('arrOfIdProduct');
  }
};

export const selectRoute = ({
  type, slug, router, id,
}) => {
  switch (type) {
    case 'brands':
      router.push(
        '/Brands/[bid]',
        `/Brands/${slug}`,
      );
      break;

    case 'categories':
      router.push({
        pathname: '/Products',
        query: {
          categoriesId: id,
        },
      });
      break;

    case 'goods':
      router.push(
        '/Products/[pid]',
        `/Products/${id}`,
      );
      break;

    case 'actions':
      router.push('/stock');
      break;

    default:
      router.push('/Products');
      break;
  }
};

export const prepareStr = str => str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

export const checkHaveIndex = (orderId, ids) => ids.find(item => item === orderId);
