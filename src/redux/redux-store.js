import { createStore, combineReducers, applyMiddleware } from "redux";
import postsReducer from "./postsReducer";
import thunkMiddelware from "redux-thunk";

let reducers = combineReducers({
  postsPage: postsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddelware));

export default store;
