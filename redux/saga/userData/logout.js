import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { cookies } from '../../../utils/getCookies';
import { getCurrentUserDataError, } from '../../actions/currentUser';
import { logoutRequest } from '../../../services/profile/userData';

function* logout({ params }) {
  const response = yield call(logoutRequest, params);
  if (response.status) {
    cookies.remove('token');
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchLogout() {
  yield takeLatest(actionTypes.currentUser.delete, logout);
}
