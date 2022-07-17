import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import productDetailPageReducer from "./productDetailPage";
import userPageReducer from "./userPage";
// import cartPageReducer from "./cart";
import categoryPageReducer from "./categoryPage";
import checkoutPageReducer from "./checkout";
import purchasePageReducer from "./purchasePage";
import productFilterPageReducer from "./productFilterPage";
import orderDetailPageReducer from "./orderDetailPage";
import homePageReducer from "./homePage";

export default combineReducers({
  counter: counterReducer,
  productDetailPage: productDetailPageReducer,
  userPage: userPageReducer,
  // cartPage: cartPageReducer,
  categoryPage: categoryPageReducer,
  checkoutPage: checkoutPageReducer,
  purchasePage: purchasePageReducer,
  productFilterPage: productFilterPageReducer,
  orderDetailPage: orderDetailPageReducer,
  homePage: homePageReducer,
});
