import { call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import { cookies } from '../../../utils/getCookies';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserDataError } from '../../actions/currentUser';
import { getCartDataSuccess } from '../../actions/cart';
import { getProductsDataSuccess } from '../../actions/products';
import { logoutRequest } from '../../../services/profile/userData';

function* logout({ params, co }) {
  console.log(JSON.stringify(JSON.parse(co)));
  const response = yield call(logoutRequest, params);
  if (co) {
    yield co.remove('token');
  }
  console.log(JSON.stringify(JSON.parse(cookies)));
  debugger;
  if (cookies) {
    yield cookies.remove('token');
  }
  debugger;
  if (!co && !cookies) {
    const newCookies = yield new Cookies();
    console.log(JSON.stringify(JSON.parse(newCookies)));
    yield newCookies.remove('token');
  }
  debugger;
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
