import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getFavouritesSuccess,
  getFavouritesError,
} from '../../actions/favourite';
import { getFavouritesRequest } from '../../../services/profile/favourite';

function* getFavourites({ params }) {
  const response = yield call(getFavouritesRequest, params);
  if (response.status) {
    yield put(getFavouritesSuccess(response.data));
  } else {
    yield put(getFavouritesError('error'));
  }
}

export function* watchGetFavourites() {
  yield takeLatest(actionTypes.favourite.request, getFavourites);
}
