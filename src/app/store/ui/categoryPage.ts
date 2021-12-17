import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

export interface CategoryPageState {
  isCategoriesInit: boolean;
}

const initialState: CategoryPageState = {
  isCategoriesInit: false,
};

const slice = createSlice({
  name: "categoryPage",
  initialState: initialState,
  reducers: {
    categoriesInitSet: (page, action: PayloadAction<boolean>) => {
      page.isCategoriesInit = action.payload;
    },
  },
});

export default slice.reducer;

const { categoriesInitSet } = slice.actions;

export const setCategoriesInit =
  (isInit: boolean): AppThunk =>
  (dispatch) => {
    dispatch(categoriesInitSet(isInit));
  };
