import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserDataSuccess, getCurrentUserDataError } from '../../actions/currentUser';
import { getUserByToken } from '../../../services/profile/userData';

function* getCurrentUser({ params }) {
  const response = yield call(getUserByToken, params);
  if (response.status) {
    yield put(getCurrentUserDataSuccess(response.data));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(actionTypes.currentUser.request, getCurrentUser);
}
