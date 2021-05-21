import * as types from "./types";
import * as utils from "./utils";
import { postAPI } from "../api/api";
import { getPostsAC } from "./operation";

const initialDescriptions = [
  {
    id: 0,
    title: "",
    body: "",
    createAt: "",
  },
];

const sliceArray = initialDescriptions.map((el) => ({
  id: Date.now(),
  idPost: el.id,
  descriptionsArray: el.body.toLowerCase().split(" "),
  titleArray: el.title.toLowerCase().split(" "),
}));

const initialStore = {
  sliceArray: initialDescriptions,
  countSameWord: sliceArray.map(utils.getCountSameWordObj),
};

const postsReducer = (state = initialStore, action) => {
  switch (action.type) {
    case types.GET_POSTS: {
      const { posts } = action.payload;
      const formatedPosts = [];
      const countSameWordArray = [];
      let formatedPost = null;
      posts.forEach((el) => {
        formatedPost = utils.getFormatedPost(Date.now() + 1, el.id, el);
        formatedPosts.push({
          id: el.id,
          body: el.body,
          title: el.title,
          createAt: new Date(),
        });
        countSameWordArray.push(utils.getCountSameWordObj(formatedPost));
      });
      return {
        sliceArray: [...formatedPosts],

        countSameWord: [...state.countSameWord, ...countSameWordArray],
      };
    }

    case types.ADD_POST:
      const { post } = action.payload;
      const newPostId = Date.now();
      const newSlicedPost = utils.getFormatedPost(
        newPostId + 1,
        newPostId,
        post,
      );

      return {
        sliceArray: [
          ...state.sliceArray,
          {
            id: newPostId,
            body: post.body,
            title: post.title,
            createAt: new Date(),
          },
        ],

        countSameWord: [
          ...state.countSameWord,
          utils.getCountSameWordObj(newSlicedPost),
        ],
      };
    case types.EDIT_POST: {
      const { post } = action.payload;
      const newSlicedPost = utils.getFormatedPost(
        Date.now() + 1,
        post.id,
        post,
      );
      const postIndex = utils.getIndexSearchableObj(state.sliceArray, post.id);

      return {
        sliceArray: [
          ...state.sliceArray.slice(0, postIndex),
          { ...post, id: state.sliceArray[postIndex].id },
          ...state.sliceArray.slice(postIndex + 1),
        ],

        countSameWord: [
          ...state.countSameWord.filter((el) => el.idPost !== post.id),
          utils.getCountSameWordObj(newSlicedPost),
        ],
      };
    }
    case types.DELETE_POST: {
      const { post } = action.payload;
      return {
        sliceArray: [...state.sliceArray.filter((el) => el.id !== post.id)],
        countSameWord: [
          ...state.countSameWord.filter((el) => el.idPost !== post.id),
        ],
      };
    }

    default:
      return state;
  }
};

export const getPosts = () => (dispatch) => {
  postAPI.getPosts().then((data) => {
    dispatch(getPostsAC(data));
  });
};

export default postsReducer;
