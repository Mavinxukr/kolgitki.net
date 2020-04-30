import * as actionTypes from './actionTypes';

export const getStockData = (params, slug, isConcatData) => ({
  type: actionTypes.stockData.request,
  params,
  slug,
  isConcatData,
});

export const getStockDataSuccess = body => ({
  type: actionTypes.stockData.success,
  body,
});

export const getStockDataError = error => ({
  type: actionTypes.stockData.error,
  error,
});
