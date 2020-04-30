import * as actionTypes from './actionTypes';

export const getDocuments = params => ({
  type: actionTypes.documents.request,
  params,
});

export const uploadDocuments = (params, body) => ({
  type: actionTypes.documents.save,
  params,
  body,
});

export const deleteDocument = (params, body) => ({
  type: actionTypes.documents.delete,
  params,
  body,
});


export const getDocumentsSuccess = body => ({
  type: actionTypes.documents.success,
  body,
});

export const getDocumentsError = error => ({
  type: actionTypes.documents.error,
  error,
});
