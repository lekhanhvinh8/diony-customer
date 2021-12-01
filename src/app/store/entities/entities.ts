import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import addressReducer from "./address";
import cartReducer from "./cart";

export default combineReducers({
  categories: categoriesReducer,
  address: addressReducer,
  cartGroups: cartReducer,
});
