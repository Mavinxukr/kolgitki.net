import * as actionTypes from './actionTypes';

export const getBlogProducts = (params, body) => ({
  type: actionTypes.blogProducts.request,
  params,
  body
});

export const clearBlogProducts = () => ({
  type: actionTypes.blogProducts.clear
});

export const getBlogProductsSuccess = body => ({
  type: actionTypes.blogProducts.success,
  body
});

export const getBlogProductsError = error => ({
  type: actionTypes.blogProducts.error,
  error
});
