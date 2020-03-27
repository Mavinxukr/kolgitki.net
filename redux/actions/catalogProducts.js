import * as actionTypes from './actionTypes';

export const getCatalogProducts = (params, body) => ({
  type: actionTypes.catalogProducts.request,
  params,
  body,
});

export const getCatalogProductsSuccess = body => ({
  type: actionTypes.catalogProducts.success,
  body,
});

export const getCatalogProductsError = error => ({
  type: actionTypes.catalogProducts.error,
  error,
});
