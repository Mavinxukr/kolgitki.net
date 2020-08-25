import _ from 'lodash';
import uniqid from 'uniqid';
import {
  getNewPostCities,
  getNewPostWarehouses,
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
    const balance = arrProducts[i].count % 3;
    sum +=
      (item.price_for_3
        && (((arrProducts[i].count - balance) / 3) * item.price_for_3)
          + balance * (item.new_price || item.price))
      || (item.new_price || item.price) * arrProducts[i].count;
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
      : (item.price_for_3
          && (((arrProducts[i].count - balance) / 3) * item.price_for_3)
            + balance * item.price)
        || item.price * arrProducts[i].count;
  }
  return +sum;
};

export const getArrOptionsCities = async (value) => {
  if (value.length > 0) {
    const result = await getNewPostCities({}, value).then(response => response.data.map(item => ({
      value: item.CityRef,
      label: item.city,
    })));
    return result;
  }
};

export const getNewPostOffice = (e, setArrOptions) => {
  getNewPostWarehouses({}, e.value).then(response => setArrOptions(
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
    if (key === 'collection_id') {
      obj[key] = value[0].id;
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

export const createCleanUrl = (cookie) => {
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
  return arrResult.join('/');
};

export const parseText = (cookie, textRu, textUK) => {
  const language = cookie.get('language') && cookie.get('language').lang;
  return (language === 'ua' && textUK) || textRu;
};

export const selectRoute = ({
  type, router, item, cookie,
}) => {
  switch (type) {
    case 'brands':
      setFiltersInCookies(cookie, {
        brands: [
          {
            id: item.id,
            name: item.name,
          },
        ],
      });
      router.push(
        '/Brands/[bid]',
        `/Brands/${item.id}/${createCleanUrl(cookie)}`,
      );
      break;

    case 'categories':
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: item.id,
            name: item.slug,
            categoryName: parseText(cookie, item.name, item.name_ua),
          },
        ],
      });
      router.push('/Products', `/Products/${createCleanUrl(cookie)}`);
      break;

    case 'goods':
      router.push('/Product/[pid]', `/Product/${item.id}`);
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

export const getCorrectPrice = (value) => {
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

const findElemInCategories = (categories, item) => {
  let finalItem;
  categories.forEach((itemChild) => {
    if (itemChild.slug === item) {
      finalItem = itemChild;
    }
    const newItem = findElemInCategories(itemChild.subcategory, item);
    if (newItem) {
      finalItem = newItem;
    }
  });
  return finalItem;
};

const createAppropriateFilters = (filters) => {
  let newObj = {};
  filters.forEach((item) => {
    if (!item.max && !_.isNull(item.max) && !item.attributes) {
      newObj = {
        ...newObj,
        ...item,
      };
    }
    if (item.attributes) {
      newObj = {
        ...newObj,
        attribute: [...item.attributes[0].value, ...item.attributes[1].value],
      };
    }
  });
  return newObj;
};

const getResultObject = (findItem, key, result) => ({
  ...result,
  [key]: [
    {
      id: findItem.id,
      name: findItem.slug,
      categoryName: findItem.name,
    },
  ],
});

const findElemInCollection = (collectionData, item) => collectionData && collectionData.find(collection => collection.slug === item);

export const getUrlArr = (url) => {
  const lastItemUrl = url.split('/')[url.split('/').length - 1];
  return lastItemUrl.split('_').slice(1);
};

export const readFiltersFromUrl = (
  url,
  categories,
  filters,
  collectionData,
) => {
  let result = {};
  getUrlArr(url).forEach((item) => {
    const findElemCategory = findElemInCategories(categories, item);
    if (findElemCategory) {
      result = getResultObject(findElemCategory, 'categories', result);
      return;
    }
    const findCollectionElem = findElemInCollection(collectionData, item);
    if (findCollectionElem) {
      result = getResultObject(findCollectionElem, 'collection_id', result);
      return;
    }
    _.forIn(createAppropriateFilters(filters), (value, key) => {
      const findElem = value.find(
        val => val.name === item
          || val.size === item
          || val.value === item
          || val.slug === item,
      );
      if (findElem) {
        const prevValue = result[key] || [];
        const newObj =
          key === 'tags'
            ? {
              id: findElem.id,
              name: findElem.slug,
              nameSpec: findElem.name,
            }
            : {
              id: findElem.id || uniqid(),
              name:
                  findElem.slug
                  || findElem.name
                  || findElem.value
                  || findElem.size,
            };
        result = {
          ...result,
          [key]: [...prevValue, newObj],
        };
      }
    });
    if (item.indexOf('sort') !== -1 || item.indexOf('price-') !== -1) {
      const arrWords = item.split('-');
      result = {
        ...result,
        [`${arrWords[0]}_${arrWords[1]}`]: arrWords[2] || 'desc',
      };
    }
  });

  return result;
};

export const deleteFiltersFromCookie = async (cookie) => {
  const appropriateCookie = cookie || cookies;
  await appropriateCookie.remove('filters');
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

export const getCountProducts = count => `${count} ${parseText(cookies, 'ед.', 'од.')} ${parseText(
  cookies,
  'осталось',
  'залишилось',
)}`;

export const calculateProcents = (firstValue, secondValue) => 100 - Math.floor((firstValue * 100) / secondValue);
