import callApi from '../../../util/apiCaller';

// Export Constants
export const ADD_MARKET = 'ADD_MARKET';


export function addMarket(market) {
  return {
    type: ADD_MARKET,
    market,
  };
}
export function FetchMarketRequest(market) {
  return (dispatch) => {
    return callApi('onlymarket', 'POST', {'MARKET':market}).then(res => {  
      dispatch(addMarket(res));
    });
  };
}

