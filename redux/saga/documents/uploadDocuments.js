import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getDocumentsSuccess,
  getDocumentsError,
} from '../../actions/documents';
import { uploadDocumentsRequest } from '../../../services/profile/docs';

function* uploadDocuments({ params, body }) {
  const response = yield call(uploadDocumentsRequest, params, body);
  if (response.status) {
    yield put(getDocumentsSuccess(response.data));
  } else {
    yield put(getDocumentsError('error'));
  }
}

export function* watchUploadDocuments() {
  yield takeLatest(actionTypes.documents.save, uploadDocuments);
}
