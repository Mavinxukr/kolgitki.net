import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getPresentSetDataSuccess, getPresentSetDataError } from '../actions/presentSet';
import { getPresentSetRequest } from '../../services/gift-backets';

function* getPresentSet({ params, id, url }) {
  const response = yield call(getPresentSetRequest, params, id, url);
  if (response.status) {
    yield put(getPresentSetDataSuccess(response.data));
  } else {
    yield put(getPresentSetDataError('error'));
  }
}

export function* watchGetPresentSet() {
  yield takeLatest(actionTypes.presentSets.request, getPresentSet);
}
