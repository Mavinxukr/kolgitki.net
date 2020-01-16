import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { registration } from '../../services/registration';
import { getUserRegistrationError, getUserRegistrationSuccess } from '../actions/registration';

function* createUser({ params, body }) {
  const response = yield call(registration, params, body);
  if (!response.errors) {
    sessionStorage.setItem('token', response.data.token);
    yield put(getUserRegistrationSuccess(response.data.user));
  } else {
    yield put(getUserRegistrationError(response.errors.email));
  }
}

export function* watchCreateUser() {
  yield takeLatest(actionTypes.registration.request, createUser);
}
