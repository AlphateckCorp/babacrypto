import { 
    // ADD_POST, 
    ADD_EXCHANGE
    // DELETE_POST 
} from './ExchangesAction';

// Initial State
const initialState = { data: [] };

const ExchangeReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_POST :
    //   return {
    //     data: [action.post, ...state.data],
    //   };

    case ADD_EXCHANGE :
      return {
        data: action.exchange,
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
export const getExchange = state => state.ExchangeList.data;

// Get post by cuid
// export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default ExchangeReducer;
