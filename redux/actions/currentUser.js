import * as actionTypes from './actionTypes';

export const sendCurrentUserData = params => ({
  type: actionTypes.currentUser.request,
  params,
});

export const logoutCurrentUser = (params, co) => ({
  type: actionTypes.currentUser.delete,
  params,
  co,
});

export const editCurrentUserData = (params, body) => ({
  type: actionTypes.currentUser.update,
  params,
  body,
});

export const loginViaFacebook = (params, body, ) => ({
  type: actionTypes.currentUser.save,
  params,
  body,
});


export const getCurrentUserDataSuccess = body => ({
  type: actionTypes.currentUser.success,
  body,
});

export const getCurrentUserDataError = error => ({
  type: actionTypes.currentUser.error,
  error,
});
