import { call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import { cookies } from '../../../utils/getCookies';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserDataError } from '../../actions/currentUser';
import { getCartDataSuccess } from '../../actions/cart';
import { getProductsDataSuccess } from '../../actions/products';
import { logoutRequest } from '../../../services/profile/userData';

function* logout({ params, co }) {
  console.log(JSON.parse(JSON.stringify(co)));
  const response = yield call(logoutRequest, params);
  debugger;
  if (co) {
    yield co.remove('token');
  }
  if (cookies) {
    yield cookies.remove('token');
  }
  if (!co && !cookies) {
    const newCookies = yield new Cookies();
    yield newCookies.remove('token');
  }
  if (response.status) {
    yield put(getCartDataSuccess([]));
    yield put(getProductsDataSuccess([]));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchLogout() {
  yield takeLatest(actionTypes.currentUser.delete, logout);
}
