import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetail } from "../../models/productDetail";
import { AppThunk, RootState } from "../store";

export interface SelectedVariantValue {
  variantId: number;
  variantValueId: number;
}

export interface ProductDetailPage {
  productDetail: ProductDetail;
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
  selectedImageUrl: "abc",
  selectedVariantValues: [
    {
      variantId: 1,
      variantValueId: 1,
    },
    {
      variantId: 2,
      variantValueId: 3,
    },
  ],
  productDetail: {
    id: 1,
    name: "Giày bóng chuyền cổ cao Beyono Golden Star C - Black White",
    description: "",
    categoryId: 67,
    avatarUrl:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1625037327/pzjs3gwt4wizomq0fffe.jpg",
    imageUrls: [
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1625580372/vzgkusph3chxdup28zc1.jpg",
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1624963553/fhlxtumco6drmpgcdla0.jpg",
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1624955809/mdaqbqaqc00bjsg1hrap.jpg",
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1624502357/f5amo9bhhm667iz8mzde.jpg",
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1622948811/znbwpwetbuegpcmx89dt.jpg",
    ],
    price: null,
    quantity: null,
    startRate: 4.5,
    numRates: 35,
    quantitySold: 20,
    variants: [
      {
        id: 1,
        name: "Chọn loại",
        values: [
          { id: 1, name: "Black" },
          { id: 2, name: "White" },
        ],
      },
      {
        id: 2,
        name: "Kích thước",
        values: [
          { id: 3, name: "39" },
          { id: 4, name: "40" },
          { id: 5, name: "41" },
          { id: 6, name: "42" },
        ],
      },
    ],
    variantValueInfos: [
      {
        firstValueId: 1,
        secondValueId: 3,
        price: 130000,
        quantity: 0,
      },
      {
        firstValueId: 1,
        secondValueId: 4,
        price: 140000,
        quantity: 14,
      },
      {
        firstValueId: 1,
        secondValueId: 5,
        price: 150000,
        quantity: 15,
      },
      {
        firstValueId: 1,
        secondValueId: 6,
        price: 160000,
        quantity: 16,
      },
      {
        firstValueId: 2,
        secondValueId: 3,
        price: 230000,
        quantity: 23,
      },
      {
        firstValueId: 2,
        secondValueId: 4,
        price: 240000,
        quantity: 24,
      },
      {
        firstValueId: 2,
        secondValueId: 5,
        price: 250000,
        quantity: 25,
      },
      {
        firstValueId: 2,
        secondValueId: 6,
        price: 260000,
        quantity: 26,
      },
    ],
  },
};

const slice = createSlice({
  name: "productDetailPage",
  initialState: initialState,
  reducers: {
    productReloaded: (page, action) => {
      page.productDetail = action.payload;
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

//action creators
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
