import { call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserDataError } from '../../actions/currentUser';
import { getCartDataSuccess } from '../../actions/cart';
import { getProductsDataSuccess } from '../../actions/products';
import { logoutRequest } from '../../../services/profile/userData';

function* logout({ params, co }) {
  const response = yield call(logoutRequest, params);
  if (co) {
    co.remove('token');
  } else {
    const cookies = new Cookies();
    cookies.remove('token');
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
