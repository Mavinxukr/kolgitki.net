import * as actionTypes from './actionTypes';

export const getPresentSet = params => ({
  type: actionTypes.presentSet.request,
  ...params,
});

export const getPresentSetDataSuccess = body => ({
  type: actionTypes.presentSet.success,
  body,
});

export const getPresentSetDataError = error => ({
  type: actionTypes.presentSet.error,
  error,
});
