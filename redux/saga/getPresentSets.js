import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  getPresentSetsDataSuccess,
  getPresentSetsDataError,
} from '../actions/presentSets';
import { getPresentSetsRequest } from '../../services/gift-backets';

const getPresentSetsFromStore = state => state.presentSets.presentSets;

function* getPresentSets({ params, body, isConcatData }) {
  const response = yield call(getPresentSetsRequest, params, body);
  const presentSets = yield select(getPresentSetsFromStore);
  if (response.status) {
    const data = isConcatData
      ? { ...response.data, data: [...presentSets.data, ...response.data.data] }
      : response.data;
    yield put(getPresentSetsDataSuccess(data));
  } else {
    yield put(getPresentSetsDataError('error'));
  }
}

export function* watchGetPresentSets() {
  yield takeLatest(actionTypes.presentSets.request, getPresentSets);
}
