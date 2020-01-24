import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getCurrentUserDataSuccess, getCurrentUserDataError } from '../actions/currentUser';
import { getUserByToken } from '../../services/product';

function* getCurrentUser({ params, token }) {
  const response = yield call(getUserByToken, params, token);
  if (response.status) {
    yield put(getCurrentUserDataSuccess(response.data));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(actionTypes.currentUser.request, getCurrentUser);
}
