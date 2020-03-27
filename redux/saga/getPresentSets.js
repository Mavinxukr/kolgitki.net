import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getPresentSetsDataSuccess, getPresentSetsDataError } from '../actions/presentSets';
import { getPresentSetsRequest } from '../../services/gift-backets';

function* getPresentSets({ params, body }) {
  const response = yield call(getPresentSetsRequest, params, body);
  if (response.status) {
    yield put(getPresentSetsDataSuccess(response.data));
  } else {
    yield put(getPresentSetsDataError('error'));
  }
}

export function* watchGetPresentSets() {
  yield takeLatest(actionTypes.presentSets.request, getPresentSets);
}
