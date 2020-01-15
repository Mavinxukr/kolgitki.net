import * as actionTypes from './actionTypes';

export const login = params => ({
  type: actionTypes.brands.request,
  params,
});


export const loginSuccess = payload => ({
  type: actionTypes.brands.success,
  payload,
});


export const loginError = error => ({
  type: actionTypes.brands.error,
  error,
});
