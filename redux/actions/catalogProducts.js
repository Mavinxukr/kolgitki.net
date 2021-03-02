import * as actionTypes from './actionTypes';

export const getCatalogProducts = (params, body, isConcatData) => ({
  type: actionTypes.catalogProducts.request,
  params,
  body,
  isConcatData
});

export const clearCatalogProducts = () => ({
  type: actionTypes.catalogProducts.clear
});

export const getCatalogProductsSuccess = body => ({
  type: actionTypes.catalogProducts.success,
  body
});

export const getCatalogProductsError = error => ({
  type: actionTypes.catalogProducts.error,
  error
});
