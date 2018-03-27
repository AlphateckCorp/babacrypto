import callApi from '../../../util/apiCaller';

// Export Constants
// export const ADD_POST = 'ADD_POST';
export const ADD_COINSLIST = 'ADD_COINSLIST';


export function addCoinslist(coins) {
  return {
    type: ADD_COINSLIST,
    coins,
  };
}

export function FetchCoinsListRequest(coinInputSymbol) {
  return (dispatch) => {
    return callApi('exchangecoin', 'POST', {'coinInputSymbol':coinInputSymbol}).then(res => {
      dispatch(addCoinslist(res));
    });
  };
}
