import _ from 'lodash';
import {
  getNewPostCities,
  getNewPostWarehouses,
  getShopCities,
  getShopByCity
} from '../services/order';
import { addToCart } from '../redux/actions/cart';
import { cookies } from './getCookies';

export const calculateBonusSum = bonuses => {
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
    const balance = arrProducts[i].count % 3;
    sum +=
      (item.price_for_3 &&
        ((arrProducts[i].count - balance) / 3) * item.price_for_3 +
          balance * (item.new_price || item.price)) ||
      (item.new_price || item.price) * arrProducts[i].count;
  }
  return +sum;
};

export const calculateSumWithoutStock = (cartData, products) => {
  let sum = 0;
  const arrProducts = !cartData.length ? products : cartData;
  for (let i = 0; i < arrProducts.length; i += 1) {
    const item = arrProducts[i].good || arrProducts[i].present;
    const balance = arrProducts[i].count % 3;
    sum += item.new_price
      ? 0
      : (item.price_for_3 &&
          ((arrProducts[i].count - balance) / 3) * item.price_for_3 +
            balance * item.price) ||
        item.price * arrProducts[i].count;
  }
  return +sum;
};

export const getArrOptionsCities = async value => {
  if (value.length > 0) {
    const result = await getNewPostCities({}, value).then(response =>
      response.data.map(item => ({
        value: item.CityRef,
        label: item.city
      }))
    );
    return result;
  }
};

export const getNewPostOffice = (e, setArrOptions) => {
  getNewPostWarehouses({}, e.value).then(response =>
    setArrOptions(
      response.data.map(item => ({
        value: item.Description,
        label: item.Description
      }))
    )
  );
};

export const getCitiesShops = setArrOptionsCitiesShops => {
  getShopCities({ language: cookies.get('language').lang }).then(response =>
    setArrOptionsCitiesShops(
      response.data.map(item => ({
        value: item,
        label: item
      }))
    )
  );
};

export const getCityShops = (setArrOptionsShops, cityRef) => {
  getShopByCity({ city: cityRef, language: cookies.get('language').lang }).then(
    response =>
      setArrOptionsShops(
        response.data.map(item => ({
          value: item.id,
          label:
            cookies.get('language').lang === 'ru'
              ? item.address
              : item.address_ua
        }))
      )
  );
};

export const saveToken = (shouldRememberedUser, token) => {
  if (shouldRememberedUser) {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 * 30 });
  } else {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 });
  }
};

export const addToCartFromLocale = dispatch => {
  if (
    localStorage.getItem('arrOfIdProduct') ||
    localStorage.getItem('arrOfIdPresent')
  ) {
    dispatch(
      addToCart({
        params: {},
        body: {
          goods: localStorage.getItem('arrOfIdProduct') || '[]',
          presents: localStorage.getItem('arrOfIdPresent') || '[]'
        },
        isAddDataByArray: true
      })
    );
    localStorage.removeItem('arrOfIdProduct');
    localStorage.removeItem('arrOfIdPresent');
  }
};



export const definiteUrlAndFunc = (
  query,
  isAuth,
  getPresentSetFunc,
  getProductDataFunc
) => {
  if (query.present) {
    return {
      url: cookies.get('token') ? 'presentsetbyid' : 'presentbyid',
      func: getPresentSetFunc
    };
  }
  return {
    url: cookies.get('token') ? 'goodbyid' : 'goods',
    func: getProductDataFunc
  };
};

export const prepareStr = str =>
  str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

export const checkHaveIndex = (item, idsPresent, idsGoods) => {
  if (item.presentset) {
    return idsPresent.find(itemChild => itemChild === item.presentset.id);
  }
  return idsGoods.find(itemChild => itemChild === item.good.id);
};

export const setFiltersInCookies = (cookie, obj) => {
  cookie.set('filters', obj, { age: 9999 * 9999 });
};

export const createCleanUrl = cookie => {
  const filters = cookie.get('filters');
  const arrResult = [];
  _.forIn(filters, (value, key) => {
    if (Array.isArray(value)) {
      value.forEach(item => arrResult.push(item.name));
      return;
    }
    if (key.indexOf('sort') !== -1) {
      arrResult.push(key.replace('_', '-'));
      return;
    }
    if (key.indexOf('price') !== -1) {
      arrResult.push(`${key.replace('_', '-')}-${value}`);
      return;
    }
    if (key === 'page') {
      return;
    }
    arrResult.push(value);
  });
  return [...new Set(arrResult)];
};

export const parseText = (cookie, textRu, textUK) => {
  const language = cookie.get('language') && cookie.get('language').lang;
  return (language === 'ua' && textUK) || textRu;
};

export const selectRoute = ({ type, router, item, cookie }) => {
  switch (type) {
    case 'brands':
      setFiltersInCookies(cookie, {
        brands: [
          {
            id: item.id,
            name: item.name
          }
        ]
      });
      router.push(
        '/brands/[bid]',
        `/brands/${item.id}/${createCleanUrl(cookie)}`
      );
      break;

    case 'categories':
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: item.id,
            name: item.crumbs,
            categoryName: parseText(cookie, item.name, item.name_ua)
          }
        ]
      });
      router.push('/products', `/products/${createCleanUrl(cookie)}`);
      break;

    case 'goods':
      router.push('/product/[pid]', `/product/${item.id}`);
      break;

    case 'actions':
      router.push('/stock');
      break;

    case 'present_sets':
      router.push({
        pathname: `/products/${item.id}`,
        query: {
          present: true
        }
      });
      break;

    default:
      router.push('/products');
      break;
  }
};

export const getCorrectPrice = value => {
  if (value && String(value).indexOf('.') !== -1) {
    return String(value).replace(/[.-]/g, ',');
  }

  return `${value}`;
};

export const getArrOfFilters = (arrSelect, cookie) => {
  const filters = cookie.get('filters');
  const arr = [];
  _.forIn(filters, (value, key) => {
    if (arrSelect.some(item => item === key)) {
      arr.push(...value);
    }
  });
  return arr;
};


export const getCorrectWordCount = (amount, arrForms) => {
  const newAmount = Math.abs(amount) % 100;
  const smallAmount = newAmount % 10;
  switch (true) {
    case newAmount > 10 && newAmount < 20:
      return `${amount} ${arrForms[2]}`;
    case smallAmount > 1 && smallAmount < 5:
      return `${amount} ${arrForms[1]}`;
    case smallAmount === 1:
      return `${amount} ${arrForms[0]}`;
    default:
      return `${amount} ${arrForms[2]}`;
  }
};

export const getCountProducts = count =>
  `${count} ${parseText(cookies, 'ед.', 'од.')} ${parseText(
    cookies,
    'осталось',
    'залишилось'
  )}`;

export const calculateProcents = (firstValue, secondValue) =>
  100 - Math.floor((firstValue * 100) / secondValue);
