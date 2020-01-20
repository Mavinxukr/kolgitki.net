import { all } from 'redux-saga/effects';
import { watchAddComment } from './addComment';

export function* rootSaga() {
  yield all([
    watchAddComment(),
  ]);
}
