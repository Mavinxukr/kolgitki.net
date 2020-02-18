import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import {
  getFavouritesSuccess,
  getFavouritesError,
} from '../../actions/favourite';
import { deleteFromFavouriteRequest } from '../../../services/profile/favourite';

const getFavourites = state => state.favourite.favourites;

function* deleteFromFavourite({ params, body }) {
  const response = yield call(deleteFromFavouriteRequest, params, body);
  const favourites = yield select(getFavourites);
  if (response.status) {
    const newArr = favourites.filter(
      item => item.good.id !== body.good_id,
    );
    yield put(getFavouritesSuccess(newArr));
  } else {
    yield put(getFavouritesError('error'));
  }
}

export function* watchDeleteFromFavourite() {
  yield takeLatest(actionTypes.favourite.delete, deleteFromFavourite);
}
