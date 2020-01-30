import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { updateCartDataRequest } from '../../../services/cart';

function* updateCartData(params) {
  const response = yield call(updateCartDataRequest, params);
  if (response.status) {
    const idx = params.cartData(item => item.id === response.data.id);
    const newArr = params.cartData.map((item, index) => (
      idx === index ? response.data : item
    ));
    yield put(getCartDataSuccess(newArr));
  } else {
    yield put(getCartDataError('error'));
  }
}

export function* watchUpdateCartData() {
  yield takeLatest(actionTypes.cart.update, updateCartData);
}
