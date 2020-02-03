import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { getCartDataRequest } from '../../../services/cart';

function* getCartData({ params }) {
  const response = yield call(getCartDataRequest, params);
  if (response.status) {
    yield put(getCartDataSuccess(response.data));
  } else {
    yield put(getCartDataError('error'));
  }
}

export function* watchGetCartData() {
  yield takeLatest(actionTypes.cart.request, getCartData);
}
