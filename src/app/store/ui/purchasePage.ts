import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { orderStatus } from "../../../config.json";
import { getAllOrders } from "../../services/orderService";

export interface OrderGroup {
  id: number;
  orderStatus: number;
  orderDate: string;
  shopId: number;
  shopName: string;
  total: number;
  shippingCost: number;
  items: Array<OrderItem>;
}

export interface OrderItem {
  id: number;
  productId: number;
  combinationId: number | null;
  name: string;
  combinationName: string;
  itemAvatarUrl: string;
  amount: number;
  price: number;
}

interface PurchasePageStore {
  selectedTab: string;
  orders: Array<OrderGroup>;
  ordersReloading: boolean;
}

const initialState: PurchasePageStore = {
  selectedTab: "all",
  orders: [],
  ordersReloading: false,
};

const slice = createSlice({
  name: "pruchasePage",
  initialState,
  reducers: {
    tabSelected: (page, action: PayloadAction<string>) => {
      page.selectedTab = action.payload;
    },
    ordersReloaded: (page, action: PayloadAction<Array<OrderGroup>>) => {
      const orders = action.payload;

      page.orders = orders;
    },
    ordersReloadingSet: (page, action: PayloadAction<boolean>) => {
      page.ordersReloading = action.payload;
    },
  },
});

export default slice.reducer;

const { tabSelected, ordersReloaded, ordersReloadingSet } = slice.actions;

export const selectTab =
  (tabValue: string): AppThunk =>
  (dispatch) => {
    dispatch(tabSelected(tabValue));
  };

export const reloadOrders =
  (selectedTab: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(ordersReloadingSet(true));

      const statusCode = getStatusCode(selectedTab);
      let orders: Array<OrderGroup> = [];

      if (selectedTab === orderStatus.all.tabName) {
        orders = await getAllOrders();
      }

      dispatch(ordersReloadingSet(false));
      dispatch(ordersReloaded(orders));
    } catch (ex) {
      dispatch(ordersReloadingSet(false));
    }
  };

//helper
export const getStatusCode = (tabName: string) => {
  const orderStatusObj = orderStatus as { [key: string]: any };

  const statusCode = orderStatusObj[tabName]?.statusCode;

  if (statusCode !== undefined) return statusCode;

  return null;
};
