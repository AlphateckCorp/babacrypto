import { 
    // ADD_POST, 
    ADD_MARKET
} from './MarketAction';

// Initial State
const initialState = { data: []};

const MarketReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_MARKET :
      return {
        data: action.market,
      };
    
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getMarket = state => state.Market.data;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default MarketReducer;
