import * as actionTypes from './actionTypes';

export const getPresentSets = (params, body, isConcatData) => ({
  type: actionTypes.presentSets.request,
  params,
  body,
  isConcatData
});

export const clearPresentSetsData = () => ({
  type: actionTypes.presentSets.clear
});

export const getPresentSetsDataSuccess = body => ({
  type: actionTypes.presentSets.success,
  body
});

export const getPresentSetsDataError = error => ({
  type: actionTypes.presentSets.error,
  error
});
