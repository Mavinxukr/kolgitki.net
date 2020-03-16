import * as actionTypes from './actionTypes';

export const getBlogData = (params, isConcatData) => ({
  type: actionTypes.blog.request,
  params,
  isConcatData,
});

export const getBlogDataSuccess = body => ({
  type: actionTypes.blog.success,
  body,
});

export const getBlogDataError = error => ({
  type: actionTypes.blog.error,
  error,
});
