/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import CoinList from './modules/App/Home/HomeReducer';
import ExchangeList from './modules/App/Exchanges/ExchangesReducer';
import MaskStatus from './modules/App/Visitexchange/visitexchangereducer';
import Chartlist from './modules/App/ChartPage/ChartPageReducer';
import ChartMarket from './modules/App/ChartPage/ChartMarketReducer';
import Market from './modules/App/Market/MarketReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  CoinList,
  ExchangeList,
  Chartlist,
  ChartMarket,
  Market,
  MaskStatus,
});
