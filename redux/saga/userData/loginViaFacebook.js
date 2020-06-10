import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { cookies } from '../../../utils/getCookies';
import {
  getCurrentUserDataSuccess,
  getCurrentUserDataError,
} from '../../actions/currentUser';
import { addToCart } from '../../actions/cart';
import { loginViaFacebook } from '../../../services/login';

function* getUserFromFacebook({ params, body }) {
  const response = yield call(loginViaFacebook, params, body);
  if (response.status) {
    yield cookies.set('token', response.data.token, { maxAge: 60 * 60 * 24 });
    if (
      localStorage.getItem('arrOfIdProduct')
      || localStorage.getItem('arrOfIdPresent')
    ) {
      yield put(addToCart({
        params: {},
        body: {
          goods: localStorage.getItem('arrOfIdProduct') || '[]',
          presents: localStorage.getItem('arrOfIdPresent') || '[]',
        },
        isAddDataByArray: true,
      }));
      localStorage.removeItem('arrOfIdProduct');
      localStorage.removeItem('arrOfIdPresent');
    }
    yield put(getCurrentUserDataSuccess(response.data.user));
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchLoginViaFacebook() {
  yield takeLatest(actionTypes.currentUser.save, getUserFromFacebook);
}
