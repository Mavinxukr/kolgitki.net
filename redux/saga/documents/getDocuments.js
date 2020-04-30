import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getDocumentsSuccess,
  getDocumentsError,
} from '../../actions/documents';
import { getDocumentsRequest } from '../../../services/profile/docs';

function* getDocuments({ params }) {
  const response = yield call(getDocumentsRequest, params);
  if (response.status) {
    yield put(getDocumentsSuccess(response.data));
  } else {
    yield put(getDocumentsError('error'));
  }
}

export function* watchGetDocuments() {
  yield takeLatest(actionTypes.documents.request, getDocuments);
}
