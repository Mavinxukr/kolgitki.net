import * as actionTypes from './actionTypes';

export const getProductsData = params => ({
  type: actionTypes.products.request,
  params,
});

export const getProductsDataSuccess = body => ({
  type: actionTypes.products.success,
  body,
});

export const getProductsDataError = error => ({
  type: actionTypes.products.error,
  error,
});
