import * as actionTypes from './actionTypes';

export const addWorker = (params, body) => ({
  type: actionTypes.workers.save,
  params,
  body,
});

export const deleteWorker = (params, body) => ({
  type: actionTypes.workers.delete,
  params,
  body,
});

export const getWorkersSuccess = body => ({
  type: actionTypes.workers.success,
  body,
});

export const getWorkersError = error => ({
  type: actionTypes.workers.error,
  error,
});
