import * as actionTypes from './actionTypes';

export const getCartData = (params, token) => ({
  type: actionTypes.cart.request,
  params,
  token,
});

export const addToCart = params => ({
  type: actionTypes.cart.save,
  ...params,
});

export const updateCartData = params => ({
  type: actionTypes.cart.update,
  ...params,
});

export const deleteFromCart = params => ({
  type: actionTypes.cart.delete,
  ...params,
});

export const getCartDataSuccess = body => ({
  type: actionTypes.cart.success,
  body,
});

export const getCartDataError = error => ({
  type: actionTypes.cart.error,
  error,
});
