import * as actionTypes from './actionTypes';

export const getNoveltyProducts = (params, body, isConcatData) => ({
  type: actionTypes.noveltyProducts.request,
  params,
  body,
  isConcatData
});

// export const clearNoveltyProducts = () => ({
//   type: actionTypes.noveltyProducts.clear
// });

// export const getNoveltyProductsSuccess = body => ({
//   type: actionTypes.noveltyProducts.success,
//   body
// });

// export const getNoveltyProductsError = error => ({
//   type: actionTypes.noveltyProducts.error,
//   error
// });
