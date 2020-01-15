import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { registration } from '../../services/registration';
import { getUserDataSuccess, getUserDataError } from '../actions/userData';

function* createUser({ params, body }) {
  try {
    const response = yield registration(params, body);
    yield put(getUserDataError(response));
  } catch (error) {
    yield put(getUserDataError(error));
  }
}

export function* watchCreateUser() {
  yield takeLatest(actionTypes.userData.request, createUser);
}
