import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCard } from "../../models/productCard";
import {
  getRecommendedProducts,
  getViewedProducts,
} from "../../services/productFilterService";
import { AppThunk } from "../store";

export const defaultRecommendedProductPageSize = 12;

export interface HomePageState {
  viewedProducts: Array<ProductCard>;
  recommendedProducts: Array<ProductCard>;
  recommendedPageSize: number;
  recommendedPageNumber: number;
  recommendedTotalProducs: number;
}

const initialState: HomePageState = {
  viewedProducts: [],
  recommendedProducts: [],
  recommendedPageSize: defaultRecommendedProductPageSize,
  recommendedPageNumber: 0,
  recommendedTotalProducs: 0,
};

const slice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    viewedProductsReload: (page, action: PayloadAction<Array<ProductCard>>) => {
      page.viewedProducts = action.payload;
    },
    recommendedProductsReload: (
      page,
      action: PayloadAction<Array<ProductCard>>
    ) => {
      page.recommendedProducts = action.payload;
    },
    recommendedPageSelected: (page, action: PayloadAction<number>) => {
      page.recommendedPageNumber = action.payload;
    },
    recommendedTotalProductsSet: (page, action: PayloadAction<number>) => {
      page.recommendedTotalProducs = action.payload;
    },
  },
});

export default slice.reducer;

const {
  viewedProductsReload,
  recommendedProductsReload,
  recommendedPageSelected,
  recommendedTotalProductsSet,
} = slice.actions;

export const loadViewedProducts =
  (numberOfProducts: number): AppThunk =>
  async (dispatch) => {
    const products = await getViewedProducts(numberOfProducts);

    dispatch(viewedProductsReload(products));
  };

export const loadRecommendedProducts =
  (): AppThunk => async (dispatch, getState) => {
    const { recommendedPageSize, recommendedPageNumber } =
      getState().ui.homePage;
    const { products, totalProducts } = await getRecommendedProducts(
      recommendedPageSize,
      recommendedPageNumber
    );
    dispatch(recommendedProductsReload(products));
    dispatch(recommendedTotalProductsSet(totalProducts));
  };

export const changeRecommendedPageNumber =
  (pageNumber: number): AppThunk =>
  async (dispatch) => {
    dispatch(recommendedPageSelected(pageNumber));
  };
