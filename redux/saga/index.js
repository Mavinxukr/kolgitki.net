import { all } from 'redux-saga/effects';
import { watchCreateUser } from './createUser';

export function* rootSaga() {
  yield all([
    watchCreateUser(),
  ]);
}
