import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getDocumentsSuccess,
  getDocumentsError,
} from '../../actions/documents';
import { deleteDocumentRequest } from '../../../services/profile/docs';

const getDocumentsData = state => state.documents.documents;

function* deleteDocument({ params, body }) {
  const response = yield call(deleteDocumentRequest, params, body);
  const documents = select(getDocumentsData);
  if (response.status) {
    const newArr = documents.filter(
      item => item.good.id !== body.good_id,
    );
    yield put(getDocumentsSuccess(newArr));
  } else {
    yield put(getDocumentsError('error'));
  }
}

export function* watchDeleteDocument() {
  yield takeLatest(actionTypes.documents.delete, deleteDocument);
}
