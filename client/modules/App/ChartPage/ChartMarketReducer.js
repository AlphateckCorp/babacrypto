import { 
    // ADD_POST, 
    ADD_EXCHANGELIST
} from './ChartPageAction';

// Initial State
const initialState = { exchange:[] };

const ChartMarketReducer = (state = initialState, action) => {
  switch (action.type) {
    
      case ADD_EXCHANGELIST :
      return {
        exchange: action.exchange,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getExchangeList = state => state.ChartMarket.exchange;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default ChartMarketReducer;
