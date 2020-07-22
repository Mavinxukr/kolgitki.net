import * as actionTypes from './actionTypes';

export const getBonuses = (params, isUserNotAuth) => ({
  type: actionTypes.bonuses.request,
  params,
  isUserNotAuth,
});

export const getBonusesSuccess = body => ({
  type: actionTypes.bonuses.success,
  body,
});

export const getBonusesError = error => ({
  type: actionTypes.bonuses.error,
  error,
});
