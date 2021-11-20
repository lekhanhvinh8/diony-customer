import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from "./entities/entities";
import uiReducer from "./ui/ui";
import userReducer from "./user";

export default combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
  user: userReducer,
});
