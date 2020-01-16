import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import * as actionTypes from '../actions/actionTypes';
import { login } from '../../services/login';
import { getUserCurrentError, getUserCurrentSuccess } from '../actions/currentUser';

const cookies = new Cookies();

function* loginUser({ params, body, isRememberUser }) {
  const response = yield call(login, params, body);
  if (!response.status) {
    yield put(getUserCurrentError(response.message));
  } else {
    if (isRememberUser) {
      cookies.set('token', response.data.token, { expires: new Date(Date.now() + 31536000) });
    } else {
      sessionStorage.setItem('token', response.data.token);
    }
    yield put(getUserCurrentSuccess(response.data.user));
  }
}

export function* watchLoginUser() {
  yield takeLatest(actionTypes.currentUser.request, loginUser);
}
