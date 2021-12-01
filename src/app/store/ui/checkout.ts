import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../models/address/address";
import { AppThunk } from "../store";

export interface CheckoutStore {
  selectedAddressId: number | null;
  selectedPaymentMethod: 1 | 2 | 3;
}

const initialState: CheckoutStore = {
  selectedAddressId: null,
  selectedPaymentMethod: 1,
};

const slice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    pageInitialized: (page, action: PayloadAction<number | null>) => {
      page.selectedAddressId = action.payload;
    },
  },
});

export default slice.reducer;

const { pageInitialized } = slice.actions;

export const initializeCheckoutPage: AppThunk = async (dispatch, getState) => {
  const addresses = getState().entities.address.addresses;

  let selectedAddressId = null;

  if (addresses.length !== 0) selectedAddressId = addresses[0].id;

  dispatch(pageInitialized(selectedAddressId));
};
