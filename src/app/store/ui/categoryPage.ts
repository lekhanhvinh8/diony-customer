import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import { ProductCard } from "../../models/productCard";
import { SelectProperty } from "../../models/selectProperty";
import { getFilteredProductOfCategory } from "../../services/productService";
import { AppThunk } from "../store";

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
  products: Array<ProductCard>;
}

const initialState: CategoryPageState = {
  categories: [],
  properties: [],
  products: [],
};

const slice = createSlice({
  name: "categoryPage",
  initialState: initialState,
  reducers: {
    productsReloaded: (page, action: PayloadAction<Array<ProductCard>>) => {
      page.products = action.payload;
    },
  },
});

export default slice.reducer;

const { productsReloaded } = slice.actions;

export const filterProducts =
  (cateId: number, pageNumber: number, pageSize: number): AppThunk =>
  async (dispatch, getState) => {
    const products = await getFilteredProductOfCategory(
      cateId,
      pageNumber,
      pageSize
    );

    dispatch(productsReloaded(products));
  };
