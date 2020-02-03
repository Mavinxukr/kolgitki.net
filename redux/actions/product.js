import * as actionTypes from './actionTypes';

export const getProductData = params => ({
  type: actionTypes.product.request,
  ...params,
});

export const getProductDataSuccess = body => ({
  type: actionTypes.product.success,
  body,
});

export const getProductDataError = error => ({
  type: actionTypes.product.error,
  error,
});
