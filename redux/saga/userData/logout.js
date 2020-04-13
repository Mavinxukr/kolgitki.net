import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { cookies } from '../../../utils/getCookies';
import { getCurrentUserDataError } from '../../actions/currentUser';
import { getCartDataSuccess } from '../../actions/cart';
import { getProductsDataSuccess } from '../../actions/products';
import { logoutRequest } from '../../../services/profile/userData';

function* logout({ params }) {
  const response = yield call(logoutRequest, params);
  cookies.remove('token');
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
