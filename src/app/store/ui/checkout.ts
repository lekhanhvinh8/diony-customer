import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import {
  getExpectedDeliveryTime as getExpectedDeliveryTimeService,
  getShippingCost as getShippingCostService,
  getVouchers,
} from "../../services/orderService";
import { CartGroup } from "../../models/cart/cartGroup";
import { Address } from "../../models/address/address";
import { Discount } from "../../models/discount";

export interface CheckoutStore {
  selectedAddressId: number | null;
  tempSelectedAddressId: number | null;
  selectedPaymentMethod: "COD" | "PAYPAL";
  expectedDeliveryTimes: Array<{
    shopId: number;
    time: string | null;
  }>;
  shippingCosts: Array<{ shopId: number; cost: number | null }>;
  vouchers: Array<Discount>;
  pageReloading: boolean;
  orderLoading: boolean;
  selectedVoucher: number | null;
  voucherDialogOpen: boolean;
}

export const initialCheckoutState: CheckoutStore = {
  selectedAddressId: null,
  tempSelectedAddressId: null,
  selectedPaymentMethod: "COD",
  expectedDeliveryTimes: [],
  shippingCosts: [],
  vouchers: [],
  pageReloading: false,
  orderLoading: false,
  selectedVoucher: null,
  voucherDialogOpen: false,
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
    orderLoadingSet: (page, action: PayloadAction<boolean>) => {
      page.orderLoading = action.payload;
    },
    voucherSelected: (page, action: PayloadAction<number>) => {
      page.selectedVoucher = action.payload;
    },
    voucherDialogSet: (page, action: PayloadAction<boolean>) => {
      page.voucherDialogOpen = action.payload;
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
  voucherSelected,
  voucherDialogSet,
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
  (addresses: Array<Address>, cartGroups: Array<CartGroup>): AppThunk =>
  async (dispatch) => {
    if (cartGroups.length === 0) return;
    if (addresses.length === 0) return;

    try {
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

        const hasAnyItemChecked = group.items
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

        const hasAnyItemChecked = group.items
          .map((i) => i.checked)
          .includes(true);

        if (selectedAddressId && hasAnyItemChecked) {
          const cartIds = group.items.filter((i) => i.checked).map((i) => i.id);

          shippingCost = await getShippingCostService(
            cartIds,
            selectedAddressId
          );
        }

        shippingCosts.push({
          shopId: group.shopInfo.shopId,
          cost: shippingCost,
        });
      }

      const vouchers = await getVouchers();

      const checkoutState: CheckoutStore = {
        selectedAddressId: selectedAddressId,
        tempSelectedAddressId: selectedAddressId,
        selectedPaymentMethod: "COD",
        expectedDeliveryTimes: expectedDeliveryTimes,
        shippingCosts: shippingCosts,
        vouchers: vouchers,
        pageReloading: false,
        orderLoading: false,
        selectedVoucher: null,
        voucherDialogOpen: false,
      };

      dispatch(pageInitialized(checkoutState));
      dispatch(pageReloadingSet(false));
    } catch (error) {
      dispatch(pageReloadingSet(false));
    }
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

export const selectVoucher =
  (voucherId: number): AppThunk =>
  (dispatch) => {
    dispatch(voucherSelected(voucherId));
  };

export const reloadShippingCostsAndExpectedDeliveryTimes =
  (addressId: number | null): AppThunk =>
  async (dispatch, getState) => {
    const cartGroups = getState().entities.cartGroups.filter((cartGroup) =>
      cartGroup.items.some((item) => item.checked)
    );

    if (cartGroups.length === 0) return;
    if (addressId === null) return;

    try {
      dispatch(pageReloadingSet(true));
      //may be i got a bug here, why getting all cartgroup instead of just checked item
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
        let shippingCost = null;
        const cartIds = group.items
          .filter((item) => item.checked)
          .map((i) => i.id);

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
      console.log("sad");
      dispatch(pageReloadingSet(false));
    }
  };

export const setOrderLoading =
  (isLoading: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(pageReloadingSet(isLoading));
  };

export const setVoucherDialog =
  (open: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(voucherDialogSet(open));
  };
