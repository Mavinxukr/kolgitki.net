import * as actionTypes from './actionTypes';

export const getOrdersData = params => ({
  type: actionTypes.order.request,
  params,
});

export const getOrdersDataSuccess = body => ({
  type: actionTypes.order.success,
  body,
});

export const getOrdersDataError = error => ({
  type: actionTypes.order.error,
  error,
});
