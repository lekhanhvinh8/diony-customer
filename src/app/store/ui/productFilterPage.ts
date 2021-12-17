import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import { ProductCard } from "../../models/productCard";
import { AppThunk, RootState } from "../store";
import {
  filter,
  getEmptyFilterRequestParams,
} from "./../../services/productFilterService";
import { numberOfProductsPerFilterPage } from "../../../config.json";

export interface ProductFilterStore {
  pageCategoryId: number | null;
  categoryChildren: Array<Category> | null;
  products: Array<ProductCard>;
  productsLoading: boolean;
  totalProducts: number;
  searchKey: string | null;
  selectedFilterCategoryId: number | null;
  selectedProvinceId: number | null;
  fromPrice: number | null;
  toPrice: number | null;
  pageNumber: number;
  pageSize: number;
}

const initialState: ProductFilterStore = {
  pageCategoryId: null,
  categoryChildren: null,
  products: [],
  totalProducts: 0,
  productsLoading: false,
  searchKey: null,
  selectedFilterCategoryId: null,
  selectedProvinceId: null,
  fromPrice: null,
  toPrice: null,
  pageNumber: 0,
  pageSize: numberOfProductsPerFilterPage,
};

const slice = createSlice({
  name: "productFilterPage",
  initialState,
  reducers: {
    categoryPageInitialized: (
      page,
      action: PayloadAction<{
        pageCateId: number;
        categoryChildren: Array<Category>;
        products: Array<ProductCard>;
        totalProducts: number;
      }>
    ) => {
      const { pageCateId, categoryChildren, products, totalProducts } =
        action.payload;

      page.pageCategoryId = pageCateId;
      page.categoryChildren = categoryChildren;
      page.products = products;
      page.totalProducts = totalProducts;

      page.productsLoading = false;
      page.searchKey = null;
      page.selectedFilterCategoryId = null;
      page.selectedProvinceId = null;
      page.fromPrice = null;
      page.toPrice = null;
      page.pageNumber = 0;
      page.pageSize = numberOfProductsPerFilterPage;
    },
    searchPageInitialized: (
      page,
      action: PayloadAction<{
        searchKey: string;
        products: Array<ProductCard>;
        totalProducts: number;
      }>
    ) => {
      const { searchKey, products, totalProducts } = action.payload;

      page.searchKey = searchKey;
      page.products = products;
      page.totalProducts = totalProducts;

      page.pageCategoryId = null;
      page.categoryChildren = null;
      page.productsLoading = false;
      page.selectedFilterCategoryId = null;
      page.selectedProvinceId = null;
      page.fromPrice = null;
      page.toPrice = null;
      page.pageNumber = 0;
      page.pageSize = numberOfProductsPerFilterPage;
    },
    productsReloaded: (page, action: PayloadAction<Array<ProductCard>>) => {
      page.products = action.payload;
    },
    totalProductsSet: (page, action: PayloadAction<number>) => {
      page.totalProducts = action.payload;
    },
    pageNumberSelected: (page, action: PayloadAction<number>) => {
      const pageNumber = action.payload;
      page.pageNumber = pageNumber;
    },
    provinceIdSelected: (page, action: PayloadAction<number | null>) => {
      page.selectedProvinceId = action.payload;
    },
    priceRangeSet: (
      page,
      action: PayloadAction<{
        fromPrice: number | null;
        toPrice: number | null;
      }>
    ) => {
      const { fromPrice, toPrice } = action.payload;
      page.fromPrice = fromPrice;
      page.toPrice = toPrice;
    },
    productsLoadingSet: (page, action: PayloadAction<boolean>) => {
      page.productsLoading = action.payload;
    },
  },
});

export default slice.reducer;

const {
  categoryPageInitialized,
  searchPageInitialized,
  productsReloaded,
  totalProductsSet,
  pageNumberSelected,
  provinceIdSelected,
  priceRangeSet,
  productsLoadingSet,
} = slice.actions;

export const initializeCategoryPage =
  (cateId: number, categoryChildren: Array<Category>): AppThunk =>
  async (dispatch) => {
    const params = getEmptyFilterRequestParams();
    params.categoryId = cateId;
    params.pageSize = numberOfProductsPerFilterPage;

    dispatch(productsLoadingSet(true));
    const { products, totalProducts } = await filter(params);
    dispatch(productsLoadingSet(false));

    dispatch(
      categoryPageInitialized({
        pageCateId: cateId,
        categoryChildren,
        products,
        totalProducts: totalProducts,
      })
    );
  };

export const initializeSearchPage =
  (keyword: string): AppThunk =>
  async (dispatch) => {
    const params = getEmptyFilterRequestParams();
    params.searchKey = keyword;

    dispatch(productsLoadingSet(true));
    const { products, totalProducts } = await filter(params);
    dispatch(productsLoadingSet(false));

    dispatch(
      searchPageInitialized({
        searchKey: keyword,
        products,
        totalProducts: totalProducts,
      })
    );
  };

export const selectPageNumber =
  (pageNumber: number): AppThunk =>
  async (dispatch, getState) => {
    const params = getProductFilterRequest(getState());

    params.pageNumber = pageNumber;

    dispatch(productsLoadingSet(true));
    const { products, totalProducts } = await filter(params);
    dispatch(productsLoadingSet(false));

    dispatch(productsReloaded(products));
    dispatch(totalProductsSet(totalProducts));
    dispatch(pageNumberSelected(pageNumber));
  };

export const selectFilterProvince =
  (provinceId: number | null): AppThunk =>
  async (dispatch, getState) => {
    const params = getProductFilterRequest(getState());
    params.provinceId = provinceId;
    params.pageNumber = 0;

    dispatch(productsLoadingSet(true));
    const { products, totalProducts } = await filter(params);
    dispatch(productsLoadingSet(false));

    dispatch(productsReloaded(products));
    dispatch(totalProductsSet(totalProducts));
    dispatch(provinceIdSelected(provinceId));
    dispatch(pageNumberSelected(0));
  };

export const applyPriceRange =
  (fromPrice: number | null, toPrice: number | null): AppThunk =>
  async (dispatch, getState) => {
    const params = getProductFilterRequest(getState());
    params.fromPrice = fromPrice;
    params.toPrice = toPrice;
    params.pageNumber = 0;

    dispatch(productsLoadingSet(true));
    const { products, totalProducts } = await filter(params);
    dispatch(productsLoadingSet(false));

    dispatch(productsReloaded(products));
    dispatch(totalProductsSet(totalProducts));
    dispatch(pageNumberSelected(0));
    dispatch(priceRangeSet({ fromPrice, toPrice }));
  };

//selectors

export const getProductFilterRequest = createSelector(
  (state: RootState) => state.ui.productFilterPage,
  (page) => {
    const productFilterRequest = getEmptyFilterRequestParams();

    productFilterRequest.categoryId = page.pageCategoryId;
    productFilterRequest.filteredCategoryId = page.selectedFilterCategoryId;
    productFilterRequest.fromPrice = page.fromPrice;
    productFilterRequest.toPrice = page.toPrice;
    productFilterRequest.pageNumber = page.pageNumber;
    productFilterRequest.pageSize = page.pageSize;
    productFilterRequest.provinceId = page.selectedProvinceId;
    productFilterRequest.searchKey = page.searchKey;

    return productFilterRequest;
  }
);
