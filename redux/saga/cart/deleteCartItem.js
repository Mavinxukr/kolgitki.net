import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { deleteCartItemRequest } from '../../../services/cart';

function* deleteCartItem(params) {
  const response = yield call(deleteCartItemRequest, params);
  if (response.status) {
    const newArr = params.cartData.filter(
      item => item.id !== params.body.good_id,
    );
    yield put(getCartDataSuccess(newArr));
  } else {
    yield put(getCartDataError('error'));
  }
}

export function* watchDeleteCartItem() {
  yield takeLatest(actionTypes.cart.delete, deleteCartItem);
}
