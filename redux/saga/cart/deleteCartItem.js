import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { deleteCartItemRequest } from '../../../services/cart';

const getCartData = state => state.cart.cartData;

function* deleteCartItem(params) {
  const response = yield call(deleteCartItemRequest, params);
  const cartData = yield select(getCartData);
  if (response.status) {
    const newArr = cartData.filter(
      item => item.good.id !== params.body.good_id,
    );
    yield put(getCartDataSuccess(newArr));
  } else {
    yield put(getCartDataError('error'));
  }
}

export function* watchDeleteCartItem() {
  yield takeLatest(actionTypes.cart.delete, deleteCartItem);
}
