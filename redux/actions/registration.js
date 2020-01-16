import * as actionTypes from './actionTypes';

export const sendRegistrationData = (params, body) => ({
  type: actionTypes.registration.request,
  params,
  body,
});


export const getUserRegistrationSuccess = payload => ({
  type: actionTypes.registration.success,
  payload,
});


export const getUserRegistrationError = error => ({
  type: actionTypes.registration.error,
  error,
});
