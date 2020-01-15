import * as actionTypes from './actionTypes';

export const registration = (params, body) => ({
  type: actionTypes.registration.request,
  params,
  body,
});


export const registrationSuccess = payload => ({
  type: actionTypes.registration.success,
  payload,
});


export const registrationError = error => ({
  type: actionTypes.registration.error,
  error,
});
