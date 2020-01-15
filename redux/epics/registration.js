import {
  concatMap, catchError, map,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as actionTypes from '../actions/actionTypes';
import { registrationSuccess, registrationError } from '../actions/registration';
import { registration } from '../../services/registration';

const fetchRegistration = action$ => action$.pipe(
  ofType(actionTypes.registration.request),
  concatMap(({ params, body }) => registration(params, body)),
  map(response => registrationSuccess(response)),
);

export default fetchRegistration;
