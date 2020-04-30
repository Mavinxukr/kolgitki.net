import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getCurrentUserDataSuccess,
  getCurrentUserDataError,
} from '../../actions/currentUser';
import { changeUserData } from '../../../services/profile/userData';

function* editCurrentUserData({ params, body }) {
  const response = yield call(changeUserData, params, body);
  if (response.status) {
    yield put(getCurrentUserDataSuccess(response.data));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchEditCurrentUserData() {
  yield takeLatest(actionTypes.currentUser.update, editCurrentUserData);
}
