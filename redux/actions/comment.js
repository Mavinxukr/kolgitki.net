import * as actionTypes from './actionTypes';

export const sendCommentData = (params, body, token) => ({
  type: actionTypes.comment.request,
  params,
  body,
  token,
});

export const addCommentSuccess = body => ({
  type: actionTypes.comment.success,
  body,
});

export const addCommentError = error => ({
  type: actionTypes.comment.error,
  error,
});
