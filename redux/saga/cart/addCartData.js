import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCartDataSuccess, getCartDataError } from '../../actions/cart';
import { addCartDataRequest } from '../../../services/cart';

function* addCartData(params) {
  const response = yield call(addCartDataRequest, params);
  if (response.status) {
    yield put(getCartDataSuccess(response.data));
  } else {
    yield put(getCartDataError(response.message));
  }
}

export function* watchAddCartData() {
  yield takeLatest(actionTypes.cart.save, addCartData);
}
