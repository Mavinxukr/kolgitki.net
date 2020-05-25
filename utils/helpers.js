import _ from 'lodash';
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
    const item = arrProducts[i].good || arrProducts[i].present;
    sum +=
      item.new_price * arrProducts[i].count
      || item.price * arrProducts[i].count;
  }
  return +sum.toFixed(2);
};

export const calculateSumWithoutStock = (cartData, products) => {
  let sum = 0;
  const arrProducts = !cartData.length ? products : cartData;
  for (let i = 0; i < arrProducts.length; i += 1) {
    const item = arrProducts[i].good || arrProducts[i].present;
    sum += item.new_price ? 0 : item.price * arrProducts[i].count;
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
  if (
    localStorage.getItem('arrOfIdProduct')
    || localStorage.getItem('arrOfIdPresent')
  ) {
    dispatch(
      addToCart({
        params: {},
        body: {
          goods: localStorage.getItem('arrOfIdProduct') || '[]',
          presents: localStorage.getItem('arrOfIdPresent') || '[]',
        },
        isAddDataByArray: true,
      }),
    );
    localStorage.removeItem('arrOfIdProduct');
    localStorage.removeItem('arrOfIdPresent');
  }
};

export const createBodyForRequestCatalog = (body) => {
  const arr = ['categories', 'brands', 'colors', 'sizes', 'attribute', 'tags'];
  const obj = {};
  _.forIn(body, (value, key) => {
    if (arr.some(item => item === key)) {
      obj[key] = JSON.stringify(
        value.map(item => (key !== 'attribute' ? item.id : item.name)),
      );
      return;
    }
    obj[key] = value;
  });
  return obj;
};

export const definiteUrlAndFunc = (
  query,
  isAuth,
  getPresentSetFunc,
  getProductDataFunc,
) => {
  if (query.present) {
    return {
      url: isAuth ? 'presentsetbyid' : 'presentbyid',
      func: getPresentSetFunc,
    };
  }
  return {
    url: isAuth ? 'goodbyid' : 'goods',
    func: getProductDataFunc,
  };
};

export const prepareStr = str => str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

export const checkHaveIndex = (item, idsPresent, idsGoods) => {
  if (item.presentset) {
    return idsPresent.find(itemChild => itemChild === item.presentset.id);
  }
  return idsGoods.find(itemChild => itemChild === item.good.id);
};

export const setFiltersInCookies = (cookie, obj) => {
  cookie.set('filters', obj);
};

export const selectRoute = ({
  type, router, item, cookie,
}) => {
  switch (type) {
    case 'brands':
      setFiltersInCookies(cookie, {
        brands: [{
          id: item.id,
          name: item.name,
        }],
      });
      router.push({
        pathname: `/Brands/${item.id}`,
        query: {
          brand_id: item.id,
        },
      });
      break;

    case 'categories':
      setFiltersInCookies(cookie, {
        categories: [{
          id: item.id,
          name: item.slug,
        }],
      });
      router.push('/Products');
      break;

    case 'goods':
      router.push('/Products/[pid]', `/Products/${item.id}`);
      break;

    case 'actions':
      router.push('/stock');
      break;

    case 'present_sets':
      router.push({
        pathname: `/Products/${item.id}`,
        query: {
          present: true,
        },
      });
      break;

    default:
      router.push('/Products');
      break;
  }
};

export const createCleanUrl = (cookie) => {
  const filters = cookie.get('filters');
  const arrResult = [];
  _.forIn(filters, (value, key) => {
    if (Array.isArray(value)) {
      value.forEach(item => arrResult.push(item.name));
      return;
    }
    if (key.indexOf('sort') !== -1) {
      arrResult.push(key);
      return;
    }
    arrResult.push(value);
  });
  return arrResult;
};

export const getCorrectPrice = value => (
  String(value).replace(/[.-]/g, ',')
);

export const getArrOfFilters = (arrSelect, cookie) => {
  console.log(cookie);
  const filters = cookie.get('filters');
  const arr = [];
  _.forIn(filters, (value, key) => {
    if (arrSelect.some(item => item === key)) {
      arr.push(...value);
    }
  });
  return arr;
};

export const deleteFiltersFromCookie = cookie => cookie.remove('filters');
