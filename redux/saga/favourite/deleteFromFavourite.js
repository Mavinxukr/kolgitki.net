import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getFavouritesSuccess,
  getFavouritesError,
} from '../../actions/favourite';
import { deleteFromFavouriteRequest } from '../../../services/profile/favourite';

function* deleteFromFavourite({ params, body }) {
  const response = yield call(deleteFromFavouriteRequest, params, body);
  if (response.status) {
    yield put(getFavouritesSuccess(response.data));
  } else {
    yield put(getFavouritesError('error'));
  }
}

export function* watchDeleteFromFavourite() {
  yield takeLatest(actionTypes.favourite.delete, deleteFromFavourite);
}
