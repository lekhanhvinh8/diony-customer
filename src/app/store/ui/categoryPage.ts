import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import { SelectProperty } from "../../models/selectProperty";

export interface SelectedValue {
  propertyId: number;
  valueId: number;
}

export interface SelectPropertyState {
  property: SelectProperty;
  queryParamName: "propId";
  selectedValueId: number;
}

export interface CategoryPageState {
  categories: Array<Category>;
  properties: Array<SelectPropertyState>;
}

const slice = createSlice({
  name: "categoryPage",
  initialState: "a",
  reducers: {},
});

export default slice.reducer;
