import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import Router from 'next/router';
import * as actionTypes from '../../actions/actionTypes';
import { cookies } from '../../../utils/getCookies';
import { definiteUrlAndFunc } from '../../../utils/helpers';
import {
  getCurrentUserDataSuccess,
  getCurrentUserDataError,
} from '../../actions/currentUser';
import { addToCart } from '../../actions/cart';
import { loginViaFacebook } from '../../../services/login';
import { getPresentSet } from '../../actions/presentSet';
import { getProductData } from '../../actions/product';

const getUserDataFromStore = state => state.currentUser.isAuth;

function* getUserFromFacebook({ params, body, isProduct }) {
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
    if (isProduct) {
      const isAuthFromStore = select(getUserDataFromStore);
      const paramObj = yield definiteUrlAndFunc(
        Router.query,
        isAuthFromStore,
        getPresentSet,
        getProductData,
      );
      yield put(paramObj.func({
        params: {},
        id: Number(Router.query.pid),
        url: params.url,
      }));
    }
  } else {
    yield put(getCurrentUserDataError('error'));
  }
}

export function* watchLoginViaFacebook() {
  yield takeLatest(actionTypes.currentUser.save, getUserFromFacebook);
}
