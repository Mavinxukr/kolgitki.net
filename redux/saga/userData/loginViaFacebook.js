import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { cookies } from '../../../utils/getCookies';
import {
  getCurrentUserDataSuccess,
  getCurrentUserDataError,
} from '../../actions/currentUser';
import { loginViaFacebook } from '../../../services/login';

function* getUserFromFacebook({ params, body }) {
  const response = yield call(loginViaFacebook, params, body);
  if (response.status) {
    cookies.set('token', response.data.token);
    yield put(getCurrentUserDataSuccess(response.data.user));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchLoginViaFacebook() {
  yield takeLatest(actionTypes.currentUser.save, getUserFromFacebook);
}
