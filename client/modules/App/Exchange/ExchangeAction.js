import callApi from '../../../util/apiCaller';


export const ADD_EXCHANGE = 'ADD_EXCHANGE';


export function addExchange(exchange) {
  return {
    type: ADD_EXCHANGE,
    exchange,
  };
}

export function FetchExchangeRequest() {
  return (dispatch) => {
    return callApi('exchangelist').then(res => {
      dispatch(addExchange(res));
    });
  };
}
