import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { deleteCartItemRequest } from '../../../services/cart';

function* deleteCartItem(params) {
  const response = yield call(deleteCartItemRequest, params);
  if (response.status) {
    yield put(getCartDataSuccess(response.data));
  } else {
    yield put(getCartDataError('error'));
  }
}

export function* watchDeleteCartItem() {
  yield takeLatest(actionTypes.cart.delete, deleteCartItem);
}
