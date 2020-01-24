import { all } from 'redux-saga/effects';
import { watchAddComment } from './addComment';
import { watchGetCurrentUser } from './getCurrentUser';

export function* rootSaga() {
  yield all([
    watchAddComment(),
    watchGetCurrentUser(),
  ]);
}
