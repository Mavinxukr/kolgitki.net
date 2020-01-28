import * as actionTypes from './actionTypes';

export const getCommentsData = (params, id) => ({
  type: actionTypes.comment.request,
  params,
  id,
});

export const addCommentData = params => ({
  type: actionTypes.comment.save,
  ...params,
});

export const editCommentData = params => ({
  type: actionTypes.comment.update,
  ...params,
});

export const deleteComment = params => ({
  type: actionTypes.comment.delete,
  ...params,
});

export const getCommentsSuccess = body => ({
  type: actionTypes.comment.success,
  body,
});

export const getCommentsError = error => ({
  type: actionTypes.comment.error,
  error,
});
