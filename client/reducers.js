/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import CoinList from './modules/App/Home/HomeReducer';
import ExchangeList from './modules/App/Exchange/ExchangeReducer';
import Chartlist from './modules/App/ChartPage/ChartPageReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  CoinList,
  ExchangeList,
  Chartlist,
});
