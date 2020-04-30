import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getWorkersError, getWorkersSuccess } from '../../actions/workers';
import { deleteWorkerRequest } from '../../../services/profile/userData';

function* deleteWorker({ params, body }) {
  const response = yield call(deleteWorkerRequest, params, body);
  if (response.status) {
    yield put(getWorkersSuccess(response.data.workers));
  } else {
    yield put(getWorkersError('error'));
  }
}

export function* watchDeleteWorker() {
  yield takeLatest(actionTypes.workers.delete, deleteWorker);
}
