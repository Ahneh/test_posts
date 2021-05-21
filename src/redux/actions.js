import * as types from "./types";
export const addDescriptionActionCreator = (post) => ({
  type: types.ADD_POST,
  payload: { post },
});

export const getPostsAC = (posts) => ({
  type: types.GET_POSTS,
  payload: { posts },
});

export const editPostAC = (post) => ({
  type: types.EDIT_POST,
  payload: { post },
});

export const deletePostAC = (post) => ({
  type: types.DELETE_POST,
  payload: { post },
});
