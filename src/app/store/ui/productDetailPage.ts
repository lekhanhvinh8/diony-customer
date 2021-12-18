import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetail } from "../../models/productDetail";
import { AppThunk, RootState } from "../store";
import {
  getProductDetail as getProductDetailService,
  getProductProperties,
} from "./../../services/productService";

export interface SelectedVariantValue {
  variantId: number;
  variantValueId: number;
}

export interface ProductSelectProperty {
  propertyId: number;
  propertyName: string;
  values: Array<String>;
}
export interface ProductTypingProperty {
  propertyId: number;
  propertyName: string;
  value: string;
}

export interface ProductDetailPage {
  productDetail: ProductDetail;
  productSelectProperties: Array<ProductSelectProperty>;
  productTypingProperties: Array<ProductTypingProperty>;
  selectedVariantValues: Array<SelectedVariantValue>;
  productPrice: number | null;
  productQuantity: number | null;
  selectedQuantity: number;
  selectedImageUrl: string;
}

const initialState: ProductDetailPage = {
  productPrice: null,
  productQuantity: null,
  selectedQuantity: 0,
  selectedImageUrl: "",
  selectedVariantValues: [],
  productSelectProperties: [],
  productTypingProperties: [],
  productDetail: {
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
    avatarUrl: "",
    imageUrls: [],
    price: null,
    quantity: null,
    starRate: 1,
    numRates: 0,
    quantitySold: 0,
    variants: [],
    variantValueInfos: [],
  },
};

const slice = createSlice({
  name: "productDetailPage",
  initialState: initialState,
  reducers: {
    productReloaded: (page, action: PayloadAction<ProductDetail>) => {
      page.productDetail = action.payload;
    },
    pageReloaded: (page, action: PayloadAction<ProductDetail>) => {
      const product = action.payload;

      page.productDetail = product;
      page.selectedImageUrl = product.avatarUrl;
      page.selectedQuantity = 0;
      page.productPrice = null;
      page.productQuantity = null;
      page.selectedVariantValues = product.variants.map((variant) => {
        const selectedValue: SelectedVariantValue = {
          variantId: variant.id,
          variantValueId: variant.values[0].id,
        };
        return selectedValue;
      });
    },
    propertiesReloadded: (
      page,
      action: PayloadAction<{
        selectProperties: Array<ProductSelectProperty>;
        typingProperties: Array<ProductTypingProperty>;
      }>
    ) => {
      page.productSelectProperties = action.payload.selectProperties;
      page.productTypingProperties = action.payload.typingProperties;
    },
    variantValueSelected: (
      page,
      action: PayloadAction<{ variantId: number; variantValueId: number }>
    ) => {
      const { variantId, variantValueId } = action.payload;
      for (const selectedVariantValue of page.selectedVariantValues) {
        if (selectedVariantValue.variantId === variantId)
          selectedVariantValue.variantValueId = variantValueId;
      }
    },
    priceAndQuantityCalculated: (
      page,
      action: PayloadAction<{ price: number | null; quantity: number | null }>
    ) => {
      const { price, quantity } = action.payload;

      page.productPrice = price;
      page.productQuantity = quantity;
    },
    selectedQuantitySet: (page, action: PayloadAction<number>) => {
      const selectedQuantity = action.payload;

      page.selectedQuantity = selectedQuantity;
    },
    imageSelected: (page, action: PayloadAction<string>) => {
      const selectedImageUrl = action.payload;

      page.selectedImageUrl = selectedImageUrl;
    },
  },
});

export default slice.reducer;

const {
  pageReloaded,
  propertiesReloadded,
  variantValueSelected,
  priceAndQuantityCalculated,
  selectedQuantitySet,
  imageSelected,
} = slice.actions;

//selectors
export const getProductDetail = createSelector(
  (state: RootState) => state.ui.productDetailPage,
  (page) => page.productDetail
);

export const getPriceAndQuantity = createSelector(
  (state: RootState) => state.ui.productDetailPage,
  (page) => {
    return { price: page.productPrice, quantity: page.productQuantity };
  }
);

export const getCombinationId = createSelector(
  (state: RootState) => state.ui.productDetailPage,
  (page) => {
    const combinations = page.productDetail.variantValueInfos;
    const selectedVariantValueIds = page.selectedVariantValues.map(
      (v) => v.variantValueId
    );

    if (combinations.length === 0) return null;

    for (const combination of combinations) {
      if (selectedVariantValueIds.includes(combination.firstValueId)) {
        if (combination.secondValueId) {
          if (selectedVariantValueIds.includes(combination.secondValueId)) {
            return combination.id;
          }
        } else {
          return combination.id;
        }
      }
    }

    return null;
  }
);

//action creators
export const reloadProductDetailPage =
  (productId: number): AppThunk =>
  async (dispatch, getState) => {
    const product = await getProductDetailService(productId);
    dispatch(pageReloaded(product));
    await dispatch(calculatePriceAndQuantity);
    await dispatch(resetSelectedQuantity);
  };

export const reloadProperties =
  (productId: number): AppThunk =>
  async (dispatch) => {
    const { selectProperties, typingProperties } = await getProductProperties(
      productId
    );

    dispatch(propertiesReloadded({ selectProperties, typingProperties }));
  };

export const selectVariantValue =
  (variantId: number, valueId: number): AppThunk =>
  (dispatch) => {
    dispatch(variantValueSelected({ variantId, variantValueId: valueId }));
  };

export const calculatePriceAndQuantity: AppThunk = (dispatch, getState) => {
  const product = getState().ui.productDetailPage.productDetail;
  const variantValueInfos =
    getState().ui.productDetailPage.productDetail.variantValueInfos;
  const selectedVariantValues =
    getState().ui.productDetailPage.selectedVariantValues;

  let price: number | null = null;
  let quantity: number | null = null;

  if (product.variants.length === 0) {
    dispatch(
      priceAndQuantityCalculated({
        price: product.price,
        quantity: product.quantity,
      })
    );

    return;
  }
  for (const priceAndQuantityInfo of variantValueInfos) {
    const selectedValueIds = selectedVariantValues.map((s) => s.variantValueId);

    if (selectedValueIds.includes(priceAndQuantityInfo.firstValueId)) {
      if (priceAndQuantityInfo.secondValueId === null) {
        price = priceAndQuantityInfo.price;
        quantity = priceAndQuantityInfo.quantity;

        dispatch(priceAndQuantityCalculated({ price, quantity }));

        return;
      } else {
        if (selectedValueIds.includes(priceAndQuantityInfo.secondValueId)) {
          price = priceAndQuantityInfo.price;
          quantity = priceAndQuantityInfo.quantity;

          dispatch(priceAndQuantityCalculated({ price, quantity }));

          return;
        }
      }
    }
  }

  dispatch(priceAndQuantityCalculated({ price, quantity }));
};

export const setSelectedQuantity =
  (selectedQuantity: number): AppThunk =>
  (dispatch, getState) => {
    const quantity = getState().ui.productDetailPage.productQuantity;
    if (quantity === null || quantity <= 0) {
      dispatch(selectedQuantitySet(0));
      return;
    }

    if (selectedQuantity < 0) {
      dispatch(selectedQuantitySet(0));
      return;
    }

    if (selectedQuantity > quantity) {
      dispatch(selectedQuantitySet(quantity));
      return;
    }

    dispatch(selectedQuantitySet(selectedQuantity));
  };

export const resetSelectedQuantity: AppThunk = (dispatch, getState) => {
  const quantity = getState().ui.productDetailPage.productQuantity;

  if (quantity === null || quantity === 0) {
    dispatch(selectedQuantitySet(0));
    return;
  }

  dispatch(selectedQuantitySet(1));
};

export const selectImageUrl =
  (imageUrl: string): AppThunk =>
  (dispatch) => {
    dispatch(imageSelected(imageUrl));
  };
