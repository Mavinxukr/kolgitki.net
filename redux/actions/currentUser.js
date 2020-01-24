import * as actionTypes from './actionTypes';

export const sendCurrentUserData = (params, token) => ({
  type: actionTypes.currentUser.request,
  params,
  token,
});

export const getCurrentUserDataSuccess = body => ({
  type: actionTypes.currentUser.success,
  body,
});

export const getCurrentUserDataError = error => ({
  type: actionTypes.currentUser.error,
  error,
});
