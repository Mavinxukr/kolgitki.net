import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getBonusesSuccess, getBonusesError } from '../actions/bonuses';
import { getUserBonuses } from '../../services/profile/bonuses';

function* getBonuses({ params }) {
  const response = yield call(getUserBonuses, params);
  if (response.status) {
    yield put(getBonusesSuccess(response.data.bonus));
  } else {
    yield put(getBonusesError('error'));
  }
}

export function* watchGetBonuses() {
  yield takeLatest(actionTypes.bonuses.request, getBonuses);
}
