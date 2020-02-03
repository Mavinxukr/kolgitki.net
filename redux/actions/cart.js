import * as actionTypes from './actionTypes';

export const getCartData = params => ({
  type: actionTypes.cart.request,
  params,
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
