import * as actionTypes from './actionTypes';

export const sendUserData = (params, body) => ({
  type: actionTypes.userData.request,
  params,
  body,
});


export const getUserDataSuccess = payload => ({
  type: actionTypes.userData.success,
  payload,
});


export const getUserDataError = error => ({
  type: actionTypes.userData.error,
  error,
});
