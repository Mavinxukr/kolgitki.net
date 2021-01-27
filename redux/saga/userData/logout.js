import { call, put, takeLatest } from 'redux-saga/effects';
import Cookie from 'cookie-universal';
import Router from 'next/router';
import { cookies } from '../../../utils/getCookies';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserDataError } from '../../actions/currentUser';
import { getCartDataSuccess } from '../../actions/cart';
import { getProductsDataSuccess } from '../../actions/products';
import { logoutRequest } from '../../../services/profile/userData';

function* logout({ params, co }) {
  const response = yield call(logoutRequest, params);
  if (co) {
    yield co.remove('token');
  }
  if (cookies) {
    yield cookies.remove('token');
  }
  if (!co && !cookies) {
    const newCookies = yield Cookie();
    yield newCookies.remove('token');
  }
  if (response.status) {
    yield Router.push('/');
    yield put(getCartDataSuccess([]));
    yield put(getProductsDataSuccess([]));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchLogout() {
  yield takeLatest(actionTypes.currentUser.delete, logout);
}
