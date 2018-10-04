import {
  // ADD_POST, 
  ADD_COINS
  // DELETE_POST 
} from './HomeAction';

// Initial State
const initialState = { data: [] };

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_POST :
    //   return {
    //     data: [action.post, ...state.data],
    //   };

    case ADD_COINS:
      return {
        data: action.coins,
      };

    // case DELETE_POST :
    //   return {
    //     data: state.data.filter(post => post.cuid !== action.cuid),
    //   };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getCoins = state => state.CoinList.data;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default HomeReducer;
