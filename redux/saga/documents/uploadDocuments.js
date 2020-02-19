import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getDocumentsSuccess,
  getDocumentsError,
} from '../../actions/documents';
import { uploadDocumentsRequest } from '../../../services/profile/docs';

const getDocumentsData = state => state.documents.documents;

function* uploadDocuments({ params, body }) {
  const response = yield call(uploadDocumentsRequest, params, body);
  // const documents = yield select(getDocumentsData);
  // if (response.status) {
  //   const newArr = [...documents, response.data];
  //   yield put(getDocumentsSuccess(newArr));
  // } else {
  //   yield put(getDocumentsError('error'));
  // }
}

export function* watchUploadDocuments() {
  yield takeLatest(actionTypes.documents.save, uploadDocuments);
}
