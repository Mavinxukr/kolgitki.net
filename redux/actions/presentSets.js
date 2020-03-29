import * as actionTypes from './actionTypes';

export const getPresentSets = (params, body) => ({
  type: actionTypes.presentSets.request,
  params,
  body,
});

export const getPresentSetsDataSuccess = body => ({
  type: actionTypes.presentSets.success,
  body,
});

export const getPresentSetsDataError = error => ({
  type: actionTypes.presentSets.error,
  error,
});
