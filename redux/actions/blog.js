import * as actionTypes from './actionTypes';

export const getBlogData = params => ({
  type: actionTypes.blog.request,
  params,
});

export const getBlogDataSuccess = body => ({
  type: actionTypes.blog.success,
  body,
});

export const getBlogDataError = error => ({
  type: actionTypes.blog.error,
  error,
});
