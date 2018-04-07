import callApi from '../../../util/apiCaller';

// Export Constants
export const ADD_COINSLIST = 'ADD_COINSLIST';
export const ADD_EXCHANGELIST = 'ADD_EXCHANGELIST';


export function addCoinslist(coins) {
  return {
    type: ADD_COINSLIST,
    coins,
  };
}
export function addExchangelist(exchange) {
  return {
    type: ADD_EXCHANGELIST,
    exchange,
  };
}
export function FetchCoinsListRequest(coinInputSymbol) {
  return (dispatch) => {
    return callApi('exchangecoin', 'POST', {'coinInputSymbol':coinInputSymbol}).then(res => {     
      
      dispatch(addCoinslist(res));
    });
  };
}
export function FetchExchangeListRequest(coinInputSymbol) {
  
  return (dispatch) => {
    return callApi('exchangemarketlist', 'POST', {'coinInputSymbol':coinInputSymbol}).then(res => {
      dispatch(addExchangelist(res));
    });
  };
}

