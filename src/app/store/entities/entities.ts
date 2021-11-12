import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";

export default combineReducers({
  categories: categoriesReducer,
});
