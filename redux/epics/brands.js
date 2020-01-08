import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as actionTypes from '../actions/actionTypes';
import { getBrandsSuccess, getBrandsError } from '../actions/brands';
import getBrandsRequest from '../../services/brands';

const fetchBrands = action$ =>
  action$.pipe(
    ofType(actionTypes.brands.request),
    mergeMap(action => getBrandsRequest(action.params)),
    map(getBrandsSuccess),
    catchError(getBrandsError)
  );

export default fetchBrands;
