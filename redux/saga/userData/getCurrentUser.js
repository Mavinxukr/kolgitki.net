import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserDataSuccess, getCurrentUserDataError } from '../../actions/currentUser';
import { getWorkersError, getWorkersSuccess } from '../../actions/workers';
import { getUserByToken } from '../../../services/profile/userData';

function* getCurrentUser({ params }) {
  const response = yield call(getUserByToken, params);
  if (response.status) {
    yield put(getCurrentUserDataSuccess(response.data));
    yield put(getWorkersSuccess(response.data.workers));
  } else {
    yield put(getCurrentUserDataError('error'));
    yield put(getWorkersError('error'));
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(actionTypes.currentUser.request, getCurrentUser);
}
