import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getWorkersError, getWorkersSuccess } from '../../actions/workers';
import { addWorkerRequest } from '../../../services/profile/userData';

function* addWorker({ params, body }) {
  const response = yield call(addWorkerRequest, params, body);
  if (response.status) {
    yield put(getWorkersSuccess(response.data.workers));
  } else {
    yield put(getWorkersError('error'));
  }
}

export function* watchAddWorker() {
  yield takeLatest(actionTypes.workers.save, addWorker);
}
