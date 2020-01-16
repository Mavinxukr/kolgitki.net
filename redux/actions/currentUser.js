import * as actionTypes from './actionTypes';

export const sendCurrentUserData = (params, body, isRememberUser) => ({
  type: actionTypes.currentUser.request,
  params,
  body,
  isRememberUser,
});


export const getUserCurrentSuccess = payload => ({
  type: actionTypes.currentUser.success,
  payload,
});


export const getUserCurrentError = error => ({
  type: actionTypes.currentUser.error,
  error,
});
