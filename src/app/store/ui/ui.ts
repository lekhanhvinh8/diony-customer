import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import productDetailPageReducer from "./productDetailPage";
import userPageReducer from "./userPage";

export default combineReducers({
  counter: counterReducer,
  productDetailPage: productDetailPageReducer,
  userPage: userPageReducer,
});
