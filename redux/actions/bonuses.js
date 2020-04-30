import * as actionTypes from './actionTypes';

export const getBonuses = params => ({
  type: actionTypes.bonuses.request,
  params,
});

export const getBonusesSuccess = body => ({
  type: actionTypes.bonuses.success,
  body,
});

export const getBonusesError = error => ({
  type: actionTypes.bonuses.error,
  error,
});
