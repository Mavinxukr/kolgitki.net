import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getOrdersDataSuccess, getOrdersDataError } from '../actions/order';
import { getOrdersRequest } from '../../services/order';

function* getOrders({ params }) {
  const response = yield call(getOrdersRequest, params);
  if (response.status) {
    yield put(getOrdersDataSuccess(response.data));
  } else {
    yield put(getOrdersDataError('error'));
  }
}

export function* watchGetOrders() {
  yield takeLatest(actionTypes.order.request, getOrders);
}
