import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { updateCartDataRequest } from '../../../services/cart';

const getCartData = state => state.cart.cartData;

function* updateCartData(params) {
  const response = yield call(updateCartDataRequest, params);
  const cartData = yield select(getCartData);
  if (response.status) {
    const idx = cartData.findIndex(item => item.id === response.data.id);
    const newArr = cartData.map((item, index) => (
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
