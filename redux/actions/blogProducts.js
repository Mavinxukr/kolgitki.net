import * as actionTypes from './actionTypes';

export const getBlogProducts = (params, body, isConcatData) => ({
  type: actionTypes.blogProducts.request,
  params,
  body,
  isConcatData
});

export const clearBlogProducts = () => ({
  type: actionTypes.blogProducts.clear
});

export const getBlogProductsSuccess = body => {
  return ({
  type: actionTypes.blogProducts.success,
  body
})};

export const getBlogProductsError = error => ({
  type: actionTypes.blogProducts.error,
  error
});
