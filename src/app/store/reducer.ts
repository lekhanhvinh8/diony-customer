import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from "./entities/entities";
import uiReducer from "./ui/ui";

export default combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});
