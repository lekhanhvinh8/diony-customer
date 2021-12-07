import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import {
  getExpectedDeliveryTime as getExpectedDeliveryTimeService,
  getShippingCost as getShippingCostService,
} from "../../services/orderService";
import { CartPageStore } from "./cart";
import { CartGroup } from "../../models/cart/cartGroup";
import { Address } from "../../models/address/address";

export interface CheckoutStore {
  selectedAddressId: number | null;
  tempSelectedAddressId: number | null;
  selectedPaymentMethod: 1 | 2 | 3;
  expectedDeliveryTimes: Array<{
    shopId: number;
    time: string | null;
  }>;
  shippingCosts: Array<{ shopId: number; cost: number | null }>;
  pageReloading: boolean;
}

export const initialCheckoutState: CheckoutStore = {
  selectedAddressId: null,
  tempSelectedAddressId: null,
  selectedPaymentMethod: 1,
  expectedDeliveryTimes: [],
  shippingCosts: [],
  pageReloading: false,
};

const slice = createSlice({
  name: "checkout",
  initialState: initialCheckoutState,
  reducers: {
    pageInitialized: (page, action: PayloadAction<CheckoutStore>) => {
      return action.payload;
    },
    tempAddressIdSelected: (page, action: PayloadAction<number>) => {
      page.tempSelectedAddressId = action.payload;
    },
    addressIdSelected: (page, action: PayloadAction<number>) => {
      page.selectedAddressId = action.payload;
    },
    paymentMethodSelected: (
      page,
      action: PayloadAction<CheckoutStore["selectedPaymentMethod"]>
    ) => {
      page.selectedPaymentMethod = action.payload;
    },
    deliveryTimeReloadded: (
      page,
      action: PayloadAction<CheckoutStore["expectedDeliveryTimes"]>
    ) => {
      page.expectedDeliveryTimes = action.payload;
    },
    shippingCostReloadded: (
      page,
      action: PayloadAction<CheckoutStore["shippingCosts"]>
    ) => {
      page.shippingCosts = action.payload;
    },
    pageReloadingSet: (page, action: PayloadAction<boolean>) => {
      page.pageReloading = action.payload;
    },
  },
});

export default slice.reducer;

const {
  pageInitialized,
  tempAddressIdSelected,
  addressIdSelected,
  paymentMethodSelected,
  deliveryTimeReloadded,
  shippingCostReloadded,
  pageReloadingSet,
} = slice.actions;

//selectors
export const getExpectedDeliveryTime = (shopId: number) =>
  createSelector(
    (state: RootState) => state.ui.checkoutPage.expectedDeliveryTimes,
    (times) => {
      return times.find((t) => t.shopId === shopId);
    }
  );

export const getShippingCost = (shopId: number) =>
  createSelector(
    (state: RootState) => state.ui.checkoutPage.shippingCosts,
    (costs) => {
      return costs.find((c) => c.shopId === shopId);
    }
  );

//action creators
export const initializeCheckoutPage =
  (
    addresses: Array<Address>,
    cartGroups: Array<CartGroup>,
    cartPage: CartPageStore
  ): AppThunk =>
  async (dispatch) => {
    if (cartGroups.length !== cartPage.cartGroupIndexes.length) return;
    if (cartGroups.length === 0 || cartPage.cartGroupIndexes.length === 0)
      return;
    if (addresses.length === 0) return;

    dispatch(pageReloadingSet(true));

    //initialize selected address
    let selectedAddressId: number | null = null;

    const defaultAddress = addresses.find((a) => a.isDefault);

    if (defaultAddress) selectedAddressId = defaultAddress.id;
    else selectedAddressId = addresses[0].id;

    //initialize deliveryTimes
    const expectedDeliveryTimes: CheckoutStore["expectedDeliveryTimes"] = [];

    for (const group of cartGroups) {
      let expectedDeliveryTime = null;

      const groupIndex = cartGroups.findIndex((g) => g === group);
      const hasAnyItemChecked = cartPage.cartGroupIndexes[
        groupIndex
      ].cartItemIndexes
        .map((i) => i.checked)
        .includes(true);

      if (selectedAddressId && hasAnyItemChecked) {
        expectedDeliveryTime = await getExpectedDeliveryTimeService(
          selectedAddressId,
          group.shopInfo.shopId
        );
      }

      expectedDeliveryTimes.push({
        shopId: group.shopInfo.shopId,
        time: expectedDeliveryTime,
      });
    }

    //initialize shippingCost;
    const shippingCosts: CheckoutStore["shippingCosts"] = [];
    for (const group of cartGroups) {
      let shippingCost = null;

      const groupIndex = cartGroups.findIndex((c) => c === group);
      const itemIndexes = cartPage.cartGroupIndexes[groupIndex].cartItemIndexes;
      const hasAnyItemChecked = itemIndexes
        .map((i) => i.checked)
        .includes(true);

      if (selectedAddressId && hasAnyItemChecked) {
        const cartIds = group.items
          .map((i) => i.id)
          .filter((item, index) => itemIndexes[index].checked);

        shippingCost = await getShippingCostService(cartIds, selectedAddressId);
      }

      shippingCosts.push({
        shopId: group.shopInfo.shopId,
        cost: shippingCost,
      });
    }

    const checkoutState: CheckoutStore = {
      selectedAddressId: selectedAddressId,
      tempSelectedAddressId: selectedAddressId,
      selectedPaymentMethod: 1,
      expectedDeliveryTimes: expectedDeliveryTimes,
      shippingCosts: shippingCosts,
      pageReloading: false,
    };

    dispatch(pageInitialized(checkoutState));
  };

export const selectAddressIdTemporarilly =
  (addressId: number): AppThunk =>
  async (dispatch) => {
    dispatch(tempAddressIdSelected(addressId));
  };

export const reselectAddress = (): AppThunk => (dispatch, getState) => {
  const tempAddressId = getState().ui.checkoutPage.tempSelectedAddressId;

  if (tempAddressId) dispatch(addressIdSelected(tempAddressId));
};

export const selectPaymentMethod =
  (paymentMethod: CheckoutStore["selectedPaymentMethod"]): AppThunk =>
  (dispatch, getState) => {
    dispatch(paymentMethodSelected(paymentMethod));
  };

export const reloadShippingCostsAndExpectedDeliveryTimes =
  (addressId: number | null): AppThunk =>
  async (dispatch, getState) => {
    const cartGroups = getState().entities.cartGroups;
    const cartPage = getState().ui.cartPage;

    if (cartGroups.length !== cartPage.cartGroupIndexes.length) return;
    if (cartGroups.length === 0 || cartPage.cartGroupIndexes.length === 0)
      return;
    if (addressId === null) return;

    try {
      dispatch(pageReloadingSet(true));

      //initialize deliveryTimes
      const expectedDeliveryTimes: CheckoutStore["expectedDeliveryTimes"] = [];

      for (const group of cartGroups) {
        let expectedDeliveryTime = null;
        expectedDeliveryTime = await getExpectedDeliveryTimeService(
          addressId,
          group.shopInfo.shopId
        );

        expectedDeliveryTimes.push({
          shopId: group.shopInfo.shopId,
          time: expectedDeliveryTime,
        });
      }

      //initialize shippingCost;
      const shippingCosts: CheckoutStore["shippingCosts"] = [];
      for (const group of cartGroups) {
        const groupIndex = cartGroups.findIndex((c) => c === group);
        const itemIndexes =
          cartPage.cartGroupIndexes[groupIndex].cartItemIndexes;

        let shippingCost = null;
        const cartIds = group.items
          .map((i) => i.id)
          .filter((item, index) => itemIndexes[index].checked);

        shippingCost = await getShippingCostService(cartIds, addressId);

        shippingCosts.push({
          shopId: group.shopInfo.shopId,
          cost: shippingCost,
        });
      }

      dispatch(deliveryTimeReloadded(expectedDeliveryTimes));
      dispatch(shippingCostReloadded(shippingCosts));

      dispatch(pageReloadingSet(false));
    } catch (ex) {
      dispatch(pageReloadingSet(false));
    }
  };
