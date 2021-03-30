import {combineReducers} from 'redux';
import {reducer as appReducer} from './app/app.js';
import {reducer as dataReducer} from './data/data.js';
import {reducer as userReducer} from './user/user.js';
import NameSpace from './namespace.js';

export default combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer,
});
