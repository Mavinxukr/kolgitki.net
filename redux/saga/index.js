import { all } from 'redux-saga/effects';
import { watchCreateUser } from './createUser';
import { watchLoginUser } from './loginUser';

export function* rootSaga() {
  yield all([
    watchCreateUser(),
    watchLoginUser(),
  ]);
}
