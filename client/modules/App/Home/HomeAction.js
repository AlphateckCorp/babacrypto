import callApi from '../../../util/apiCaller';

// Export Constants
// export const ADD_POST = 'ADD_POST';
export const ADD_COINS = 'ADD_COINS';
// export const DELETE_POST = 'DELETE_POST';

// Export Actions
// export function addPost(post) {
//   return {
//     type: ADD_POST,
//     post,
//   };
// }

// export function addPostRequest(post) {
//   return (dispatch) => {
//     return callApi('posts', 'post', {
//       post: {
//         name: post.name,
//         title: post.title,
//         content: post.content,
//       },
//     }).then(res => dispatch(addPost(res.post)));
//   };
// }

export function addCoins(coins) {
  return {
    type: ADD_COINS,
    coins,
  };
}

export function FetchCoinsRequest(limit) {
  return (dispatch) => {
    return callApi('yours?offset=0&limit='+limit).then(res => {
      dispatch(addCoins(res));
    });
  };
}

// export function fetchPost(cuid) {
//   return (dispatch) => {
//     return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
//   };
// }

// export function deletePost(cuid) {
//   return {
//     type: DELETE_POST,
//     cuid,
//   };
// }

// export function deletePostRequest(cuid) {
//   return (dispatch) => {
//     return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
//   };
// }
