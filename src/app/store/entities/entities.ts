import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import addressReducer from "./address";

export default combineReducers({
  categories: categoriesReducer,
  address: addressReducer,
});
