import callApi from '../../../util/apiCaller';


export const ADD_EXCHANGE = 'ADD_EXCHANGE';


export function addExchange(exchange) {
  return {
    type: ADD_EXCHANGE,
    exchange,
  };
}

export function FetchExchangeRequest(limit,sort) {
  return (dispatch) => {
    return callApi('exchangelist?offset=0&limit='+limit+'&sort='+sort.toString()).then(res => {
      dispatch(addExchange(res));
    });
  };
}
