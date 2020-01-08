import { combineEpics } from 'redux-observable';
import brandsEpic from './brands';


const rootEpic = combineEpics(
    brandsEpic
);

export default rootEpic;