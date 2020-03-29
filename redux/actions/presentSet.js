import * as actionTypes from './actionTypes';

export const getPresentSet = (params, id, url) => ({
  type: actionTypes.presentSet.request,
  params,
  id,
  url,
});

export const getPresentSetDataSuccess = body => ({
  type: actionTypes.presentSet.success,
  body,
});

export const getPresentSetDataError = error => ({
  type: actionTypes.presentSet.error,
  error,
});
