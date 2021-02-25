import * as actionTypes from './actionTypes';

export const getStocks = (params, body, isConcatData) => ({
  type: actionTypes.stocks.request,
  params,
  body,
  isConcatData
});

export const clearStocks = () => ({
  type: actionTypes.stocks.clear
});

export const getStocksSuccess = body => ({
  type: actionTypes.stocks.success,
  body
});

export const getStocksError = error => ({
  type: actionTypes.stocks.error,
  error
});
