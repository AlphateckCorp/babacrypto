import { 
    // ADD_POST, 
    ADD_COINSLIST
    // DELETE_POST 
} from './ChartPageAction';

// Initial State
const initialState = { data: [] };

const ChartPageReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_COINSLIST :
      return {
        data: action.coins,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getCoinsList = state => state.Chartlist.data;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default ChartPageReducer;
