import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getFavouritesSuccess,
  getFavouritesError,
} from '../../actions/favourite';
import { addToFavouriteRequest } from '../../../services/profile/favourite';

function* addToFavourite({ params, body, isPresent }) {
  const response = yield call(addToFavouriteRequest, params, body, isPresent);
  if (response.status) {
    yield put(getFavouritesSuccess(response.data));
  } else {
    yield put(getFavouritesError('error'));
  }
}

export function* watchAddToFavourite() {
  yield takeLatest(actionTypes.favourite.save, addToFavourite);
}
